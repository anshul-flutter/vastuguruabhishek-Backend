import User from "../../model/UserModel.js";

// Delete a user
export const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findByIdAndDelete(id);

		if (!user) {
			return res.status(404).json({
				status: false,
				message: "User not found",
			});
		}

		res.status(200).json({
			status: true,
			message: "User deleted successfully",
		});
	} catch (error) {
		console.error("Error deleting user:", error);
		res.status(500).json({
			status: false,
			message: "Error deleting user",
			error: error.message,
		});
	}
};

// Update user role (e.g., make admin)
export const updateUserRole = async (req, res) => {
	try {
		const { id } = req.params;
		const { role } = req.body;

		if (!["student", "astrologer", "admin"].includes(role)) {
			return res.status(400).json({
				status: false,
				message: "Invalid role",
			});
		}

		const user = await User.findByIdAndUpdate(
			id,
			{ role },
			{ new: true, runValidators: true }
		);

		if (!user) {
			return res.status(404).json({
				status: false,
				message: "User not found",
			});
		}

		res.status(200).json({
			status: true,
			message: "User role updated successfully",
			data: user,
		});
	} catch (error) {
		console.error("Error updating user role:", error);
		res.status(500).json({
			status: false,
			message: "Error updating user role",
			error: error.message,
		});
	}
};
