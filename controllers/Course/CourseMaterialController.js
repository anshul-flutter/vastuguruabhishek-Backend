import Course from "../../model/CourseModel.js";
import cloudinary from "../../config/cloudinary.js";

const uploadToCloudinary = async (
	fileBuffer,
	folder,
	resourceType = "auto",
	originalName
) => {
	return new Promise((resolve, reject) => {
		const uploadStream = cloudinary.uploader.upload_stream(
			{
				folder,
				resource_type: resourceType,
				public_id: originalName ? originalName.split(".")[0] : undefined,
				use_filename: true,
				unique_filename: true,
			},
			(error, result) => {
				if (error) reject(error);
				else resolve(result);
			}
		);
		uploadStream.end(fileBuffer);
	});
};

export const addMaterial = async (req, res) => {
	try {
		const { courseId } = req.params;
		const { title, type, url, isPublic } = req.body;

		const course = await Course.findById(courseId);
		if (!course) {
			return res
				.status(404)
				.json({ success: false, message: "Course not found" });
		}

		let materialUrl = url;
		let materialType = type;

		if (req.file) {
			const ext = req.file.originalname.split(".").pop().toLowerCase();
			let resourceType = "raw";
			if (["jpg", "jpeg", "png", "webp"].includes(ext)) resourceType = "image";
			if (["mp4", "mov", "avi", "mkv"].includes(ext)) resourceType = "video";

			// PDFs should be uploaded as 'raw' to ensure direct PDF delivery (application/pdf)
			// rather than via image delivery which can produce derived images or restricted access.
			if (["pdf"].includes(ext)) resourceType = "raw";
			if (["doc", "docx", "txt"].includes(ext)) resourceType = "raw";

			const result = await uploadToCloudinary(
				req.file.buffer,
				"course_materials",
				resourceType,
				req.file.originalname
			);
			materialUrl = result.secure_url;

			// Infer type if not provided or if file uploaded
			if (!materialType) {
				if (["pdf"].includes(ext)) materialType = "pdf";
				else if (["doc", "docx", "txt"].includes(ext)) materialType = "doc";
				else if (["mp4", "mov", "avi", "mkv"].includes(ext))
					materialType = "video";
				else if (["jpg", "jpeg", "png", "webp"].includes(ext))
					materialType = "image";
				else materialType = "doc";
			}
		}

		if (!materialUrl) {
			return res
				.status(400)
				.json({ success: false, message: "URL or File is required" });
		}

		const newMaterial = {
			title,
			type: materialType || "link",
			url: materialUrl,
			isPublic: isPublic === "true" || isPublic === true,
		};

		course.materials.push(newMaterial);
		await course.save();

		res.status(200).json({
			success: true,
			message: "Material added successfully",
			data: course.materials,
		});
	} catch (error) {
		console.error("Error adding material:", error);
		res.status(500).json({
			success: false,
			message: "Failed to add material",
			error: error.message,
		});
	}
};

export const removeMaterial = async (req, res) => {
	try {
		const { courseId, materialId } = req.params;

		const course = await Course.findById(courseId);
		if (!course) {
			return res
				.status(404)
				.json({ success: false, message: "Course not found" });
		}

		course.materials = course.materials.filter(
			(m) => m._id.toString() !== materialId
		);
		await course.save();

		res.status(200).json({
			success: true,
			message: "Material removed successfully",
			data: course.materials,
		});
	} catch (error) {
		console.error("Error removing material:", error);
		res.status(500).json({
			success: false,
			message: "Failed to remove material",
			error: error.message,
		});
	}
};
