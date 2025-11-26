/**
 * Quick Session Test Data Creator
 * Run this script to create test instructor and session data
 */

// DEPRECATED: This legacy seeder is disabled. Use exportStaticData/importStaticData instead.
if (process.env.ALLOW_LEGACY_SEED !== "true") {
	console.error(
		"[DEPRECATED] scripts/createSessionTestData.js is disabled. Use export:static/import:static."
	);
	process.exit(1);
}

import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "../model/CourseModel.js";
import CourseSession from "../model/CourseSessionModel.js";
import User from "../model/UserModel.js";
import { fileURLToPath } from "url";

dotenv.config();

const createTestData = async () => {
	try {
		// Connect to MongoDB
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Connected to MongoDB");

		// 1. Create or find an instructor (User with role 'astrologer' or 'admin')
		let instructor = await User.findOne({
			email: "instructor@example.com",
		});
		if (!instructor) {
			instructor = await User.create({
				name: "Test Instructor",
				email: "instructor@example.com",
				password: "password123",
				role: "astrologer",
				bio: "Expert Astrologer",
				expertise: ["Vedic", "KP"],
			});
			console.log("Created new instructor user:", instructor._id);
		} else {
			console.log("Found existing instructor user:", instructor._id);
		}

		// 2. Create a course linked to this instructor
		const course = await Course.create({
			title: "Advanced Vedic Astrology Session Test",
			description: "A course to test session functionality",
			instructor: instructor._id,
			price: 4999,
			category: "Astrology",
			thumbnail: "https://placehold.co/600x400",
			language: "Hindi",
			level: "Advanced",
		}); // 3. Create test sessions with different statuses and times
		const sessionCount = await CourseSession.countDocuments();
		if (sessionCount === 0) {
			const instructor = await Instructor.findOne();
			const course = await Course.findOne();

			const testSessions = [
				{
					title: "Introduction to Vedic Astrology",
					description: "Overview of Vedic Astrology principles",
					sessionNumber: 1,
					scheduledDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Tomorrow
					scheduledTime: "10:00",
					duration: 60,
					status: "scheduled",
				},
				{
					title: "Planetary Positions and Houses",
					description: "Understanding the 12 houses and planetary influences",
					sessionNumber: 2,
					scheduledDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
					scheduledTime: "14:00",
					duration: 90,
					status: "scheduled",
				},
				{
					title: "Chart Reading Basics",
					description: "How to read and interpret birth charts",
					sessionNumber: 3,
					scheduledDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Yesterday (will show as missed)
					scheduledTime: "16:00",
					duration: 75,
					status: "completed",
				},
			];

			for (const sessionData of testSessions) {
				const session = new CourseSession({
					...sessionData,
					course: course._id,
					instructor: instructor._id,
					enrolledStudents: [], // Empty for now
					chatEnabled: true,
				});
				await session.save();
			}
			console.log("✅ Test sessions created");
		} else {
			console.log(`✅ Found ${sessionCount} session(s)`);
		}

		console.log("\n🎉 Test data setup complete!");
		console.log("You can now:");
		console.log("1. Create new sessions in admin panel");
		console.log("2. View existing sessions");
		console.log("3. Test session joining functionality");

		process.exit(0);
	} catch (error) {
		console.error("❌ Error creating test data:", error);
		process.exit(1);
	}
};

createTestData();
