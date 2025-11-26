import mongoose from "mongoose";
import dotenv from "dotenv";
import cloudinary from "../config/cloudinary.js";
import Course from "../model/CourseModel.js";

dotenv.config();

async function main() {
	const mongoUri = process.env.MONGO_URI;
	if (!mongoUri) {
		console.error("MONGO_URI not set in environment");
		process.exit(1);
	}

	await mongoose.connect(mongoUri, { dbName: undefined });
	console.log("Connected to MongoDB");

	const courses = await Course.find({ "materials.type": "pdf" });
	let updatedCount = 0;

	for (const course of courses) {
		let changed = false;
		for (const m of course.materials) {
			if (m?.type !== "pdf" || !m?.url) continue;
			if (!m.url.includes("/image/upload/")) continue; // likely fine already if it's not image delivery

			try {
				// Re-upload the existing URL to Cloudinary as raw to obtain a proper PDF delivery URL
				const publicIdBase = (m.title || "course_material")
					.toString()
					.trim()
					.replace(/\.[^/.]+$/, "")
					.replace(/[^a-zA-Z0-9_-]+/g, "-")
					.replace(/^-+|-+$/g, "");

				const result = await cloudinary.uploader.upload(m.url, {
					folder: "course_materials",
					resource_type: "raw",
					use_filename: true,
					unique_filename: true,
					public_id: publicIdBase || undefined,
				});

				m.url = result.secure_url;
				changed = true;
				updatedCount += 1;
				console.log(
					`Re-uploaded PDF for course ${course._id}:`,
					m.title || m.url
				);
			} catch (e) {
				console.warn(
					`Failed to re-upload PDF for course ${course._id}:`,
					e?.message || e
				);
			}
		}

		if (changed) {
			await course.save();
		}
	}

	console.log(`Done. Updated ${updatedCount} material URLs.`);
	await mongoose.disconnect();
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
