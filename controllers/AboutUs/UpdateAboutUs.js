import AboutUs from "../../model/AboutUsModel.js";
import cloudinary from "../../config/cloudinary.js";

const uploadToCloudinary = async (fileBuffer, folder) => {
	return new Promise((resolve, reject) => {
		cloudinary.uploader
			.upload_stream({ folder, resource_type: "image" }, (error, result) => {
				if (error) reject(error);
				else resolve(result);
			})
			.end(fileBuffer);
	});
};

export const updateAboutUs = async (req, res) => {
	try {
		const updatedData = { ...req.body };

		// Handle image upload
		if (req.file && req.file.buffer) {
			const result = await uploadToCloudinary(req.file.buffer, "about_us");
			updatedData.image = result.secure_url;
		}

		// Update (or create if not exists)
		const updatedAbout = await AboutUs.findOneAndUpdate(
			{}, // match condition (empty means first/only doc)
			updatedData,
			{ new: true, upsert: true }
		);

		if (!updatedAbout) {
			return res.status(404).json({
				status: false,
				code: 404,
				message: "About Us not found",
				data: null,
			});
		}

		res.status(200).json({
			status: true,
			code: 200,
			message: "About Us updated successfully",
			data: updatedAbout,
		});
	} catch (error) {
		console.error("Error updating About Us:", error);
		res.status(500).json({
			status: false,
			code: 500,
			message: "Error updating About Us",
			error: error.message,
		});
	}
};
