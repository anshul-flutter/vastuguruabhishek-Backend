import Order from "../../model/OrderModel.js";

export const getStudentBookings = async (req, res, next) => {
	try {
		const { studentId } = req.query;

		// Build filter object - get course orders that are bookings OR package/service bookings
		const filter = {
			$or: [
				{
					"items.itemType": "course",
					"items.courseDetails.isBooking": true,
				},
				{
					"items.itemType": { $in: ["package", "service"] },
				},
			],
		};
		if (studentId) {
			filter.user = studentId;
		}

		const bookings = await Order.find(filter)
			.populate({
				path: "user",
				select: "name email phone",
			})
			.populate({
				path: "items.itemId",
				select: "title description instructor",
			})
			.sort({ createdAt: -1 });

		// Transform data to match expected booking format
		const formattedBookings = bookings.flatMap((order) =>
			order.items
				.filter(
					(item) =>
						(item.itemType === "course" && item.courseDetails?.isBooking) ||
						["package", "service"].includes(item.itemType)
				)
				.map((item) => {
					const isCourse = item.itemType === "course";
					const isPackage = item.itemType === "package";
					// For services, we might not have specific details structure like packageDetails
					const details = isCourse
						? item.courseDetails
						: isPackage
						? item.packageDetails
						: item.serviceDetails || {};

					return {
						_id: `${order._id}_${item._id}`,
						student: order.user,
						course: item.itemId, // This contains the Course or Service details
						orderNumber: order.orderNumber,
						sessionDate: isCourse
							? details.sessionDate
							: isPackage
							? details.scheduledDate
							: null, // Services might not have scheduled date
						sessionTime: isCourse
							? details.sessionTime
							: isPackage
							? details.scheduledTime
							: null,
						astrologerName: isCourse ? details.astrologerName : "Astrologer",
						paymentAmount: item.price,
						payoutAmount: isCourse ? details.payoutAmount : 0,
						paymentStatus:
							order.paymentStatus === "paid"
								? "Paid"
								: order.paymentStatus === "pending"
								? "Pending"
								: "Failed",
						bookingStatus: isCourse
							? details.bookingStatus
							: order.status === "completed"
							? "Completed"
							: "Scheduled",
						avatar: item.image || order.user?.avatar,
						createdAt: order.createdAt,
						updatedAt: order.updatedAt,
						type: isCourse
							? "Course Booking"
							: isPackage
							? "Consultation"
							: "Service",
					};
				})
		);

		return res.status(200).json({
			success: true,
			bookings: formattedBookings,
		});
	} catch (error) {
		next(error);
	}
};
