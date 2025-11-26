import User from "../../model/UserModel.js";
import cloudinary from "../../config/cloudinary.js";

export const updateProfile = async (req, res) => {
	try {
		const userId = req.user.id; // From auth middleware
		const { name, email, phone, dob, expertise } = req.body;

		// Find the user
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		// Check if email is being changed and if it's already taken
		if (email && email !== user.email) {
			const existingUser = await User.findOne({ email });
			if (existingUser) {
				return res.status(400).json({
					success: false,
					message: "Email is already in use",
				});
			}
		}

		// Update user fields
		if (name) user.name = name;
		if (email) user.email = email;
		if (phone) user.phone = phone;
		// Update expertise if provided (string or array)
		if (typeof expertise !== "undefined") {
			if (Array.isArray(expertise)) {
				user.expertise = expertise.filter((e) => typeof e === "string");
			} else if (typeof expertise === "string") {
				user.expertise = expertise
					.split(",")
					.map((s) => s.trim())
					.filter(Boolean);
			}
		}

		// Update DOB if provided
		if (dob) {
			// Handle both object and individual fields
			if (typeof dob === "object") {
				if (dob.day) user.dob.day = parseInt(dob.day);
				if (dob.month) user.dob.month = parseInt(dob.month);
				if (dob.year) user.dob.year = parseInt(dob.year);
			}
		}

		// Handle profile image upload using memory storage buffer
		if (req.file && req.file.buffer) {
			try {
				const result = await new Promise((resolve, reject) => {
					const stream = cloudinary.uploader.upload_stream(
						{
							folder: "profiles",
							resource_type: "image",
							use_filename: true,
							unique_filename: true,
							public_id: user._id?.toString(),
						},
						(err, res) => (err ? reject(err) : resolve(res))
					);
					stream.end(req.file.buffer);
				});
				user.profileImage = result.secure_url;
			} catch (e) {
				console.warn("Cloudinary upload failed:", e?.message);
			}
		}

		await user.save();

		// Return updated user without password
		const updatedUser = await User.findById(userId).select("-password");

		res.status(200).json({
			success: true,
			message: "Profile updated successfully",
			data: updatedUser,
		});
	} catch (error) {
		console.error("Error updating profile:", error);
		res.status(500).json({
			success: false,
			message: "Failed to update profile",
			error: error.message,
		});
	}
};
