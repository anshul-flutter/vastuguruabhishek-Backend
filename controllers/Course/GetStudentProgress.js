import StudentProgress from "../../model/StudentProgressModel.js";
import CourseSession from "../../model/CourseSessionModel.js";

/**
 * Get student's progress for a specific course
 */
export const getStudentCourseProgress = async (req, res) => {
	try {
		const userId = req.user?._id;
		const { courseId } = req.params;

		if (!userId) {
			return res.status(401).json({
				status: "false",
				code: "401",
				message: "User not authenticated",
				data: {},
			});
		}

		if (!courseId) {
			return res.status(400).json({
				status: "false",
				code: "400",
				message: "Course ID is required",
				data: {},
			});
		}

		// Derive session-based progress
		const [totalSessions, courseCompletedSessions, attendedSessions] =
			await Promise.all([
				CourseSession.countDocuments({
					course: courseId,
					isActive: true,
					status: { $ne: "cancelled" },
				}),
				CourseSession.countDocuments({
					course: courseId,
					isActive: true,
					status: "completed",
				}),
				CourseSession.countDocuments({
					course: courseId,
					isActive: true,
					status: "completed",
					"attendedStudents.student": userId,
				}),
			]);

		// Per-user progress: attendance percentage instead of course completion
		const attendancePercentage =
			totalSessions > 0
				? Math.round((attendedSessions / totalSessions) * 100)
				: 0;

		// Upsert StudentProgress with session-driven values
		const status =
			attendancePercentage >= 100
				? "Completed"
				: attendancePercentage >= 50
				? "On Track"
				: "Behind";

		const progressDoc = await StudentProgress.findOneAndUpdate(
			{ student: userId, course: courseId },
			{
				$set: {
					progressPercent: attendancePercentage,
					status,
					"sessionProgress.totalSessions": totalSessions,
					"sessionProgress.attendedSessions": attendedSessions,
					"sessionProgress.attendancePercentage": attendancePercentage,
				},
			},
			{ new: true, upsert: true }
		)
			.populate({ path: "course", select: "title" })
			.populate({ path: "student", select: "name email" })
			.lean();

		res.status(200).json({
			status: "true",
			code: "200",
			message: "Course progress fetched successfully",
			data: progressDoc,
		});
	} catch (error) {
		console.error("Error fetching student course progress:", error);
		res.status(500).json({
			status: "false",
			code: "500",
			message: "Failed to fetch course progress",
			data: {},
			error: error.message,
		});
	}
};
