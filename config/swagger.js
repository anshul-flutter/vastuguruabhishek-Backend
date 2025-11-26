import swaggerJsdoc from "swagger-jsdoc";

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "VastuGuru API Documentation",
			version: "1.0.0",
			description:
				"Comprehensive API documentation for VastuGuru - An astrology and spiritual learning platform",
			contact: {
				name: "API Support",
				email: "support@vastuguru.com",
			},
		},
		servers: [
			{
				url: "http://localhost:8080",
				description: "Development server",
			},
			{
				url: process.env.API_URL || "https://api.vastuguru.com",
				description: "Production server",
			},
		],
		components: {
			securitySchemes: {
				cookieAuth: {
					type: "apiKey",
					in: "cookie",
					name: "token",
					description: "JWT token stored in HTTP-only cookie",
				},
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
					description: "JWT token for authentication",
				},
			},
			schemas: {
				User: {
					type: "object",
					properties: {
						_id: { type: "string", example: "60d5ec49f1b2c8b1f8c8e8e8" },
						name: { type: "string", example: "John Doe" },
						email: { type: "string", example: "john@example.com" },
						phone: { type: "string", example: "+1234567890" },
						dob: {
							type: "object",
							properties: {
								day: { type: "number", example: 15 },
								month: { type: "number", example: 8 },
								year: { type: "number", example: 1990 },
							},
						},
						role: {
							type: "string",
							enum: ["student", "astrologer", "admin"],
							example: "student",
						},
						profileImage: { type: "string", example: "uploads/profile.jpg" },
						enrolledCourses: {
							type: "array",
							items: { type: "string" },
							example: ["60d5ec49f1b2c8b1f8c8e8e8"],
						},
						resetPasswordToken: { type: "string" },
						resetPasswordExpire: { type: "string", format: "date-time" },
						createdAt: { type: "string", format: "date-time" },
						updatedAt: { type: "string", format: "date-time" },
					},
				},
				PendingRegistration: {
					type: "object",
					properties: {
						_id: { type: "string", example: "60d5ec49f1b2c8b1f8c8e8e8" },
						name: { type: "string", example: "John Doe" },
						email: { type: "string", example: "john@example.com" },
						phone: { type: "string", example: "+1234567890" },
						dob: {
							type: "object",
							properties: {
								day: { type: "number", example: 15 },
								month: { type: "number", example: 8 },
								year: { type: "number", example: 1990 },
							},
						},
						password: { type: "string", description: "Hashed password" },
						role: {
							type: "string",
							enum: ["student", "astrologer"],
							example: "student",
						},
						otp: { type: "string", example: "123456" },
						otpExpire: { type: "string", format: "date-time" },
						createdAt: { type: "string", format: "date-time" },
					},
				},
				Course: {
					type: "object",
					properties: {
						_id: { type: "string", example: "60d5ec49f1b2c8b1f8c8e8e8" },
						title: { type: "string", example: "Vedic Astrology Basics" },
						description: {
							type: "string",
							example: "Learn the fundamentals of Vedic astrology",
						},
						price: { type: "number", example: 999 },
						originalPrice: { type: "number", example: 1999 },
						image: { type: "string", example: "uploads/course.jpg" },
						createdBy: { type: "string", example: "60d5ec49f1b2c8b1f8c8e8e8" },
						languages: {
							type: "array",
							items: { type: "string" },
							example: ["English", "Hindi"],
						},
						subtitles: {
							type: "array",
							items: { type: "string" },
							example: ["English"],
						},
						premium: { type: "boolean", example: false },
						rating: { type: "number", example: 4.5 },
						ratingCount: { type: "number", example: 120 },
						learners: { type: "number", example: 500 },
						duration: { type: "number", example: 120 },
						lessons: { type: "number", example: 15 },
						whatYouWillLearn: {
							type: "array",
							items: { type: "string" },
							example: ["Understanding birth charts", "Planetary positions"],
						},
						courseStart: {
							type: "string",
							format: "date-time",
							description: "Start date of the course",
						},
						courseContent: {
							type: "array",
							items: {
								type: "object",
								properties: {
									title: { type: "string" },
									preview: { type: "boolean" },
									video: { type: "string" },
								},
							},
						},
					},
				},
				Blog: {
					type: "object",
					properties: {
						_id: { type: "string", example: "60d5ec49f1b2c8b1f8c8e8e8" },
						title: {
							type: "string",
							example: "Understanding Your Birth Chart",
						},
						description: { type: "string" },
						mainImage: { type: "string", example: "uploads/blog-main.jpg" },
						sections: {
							type: "array",
							items: {
								type: "object",
								properties: {
									title: { type: "string" },
									content: { type: "string" },
									image: { type: "string" },
								},
							},
						},
						author: { type: "string", example: "60d5ec49f1b2c8b1f8c8e8e8" },
						createdAt: { type: "string", format: "date-time" },
						updatedAt: { type: "string", format: "date-time" },
					},
				},
				AboutUs: {
					type: "object",
					properties: {
						_id: { type: "string", example: "60d5ec49f1b2c8b1f8c8e8e8" },
						title: { type: "string", example: "About VastuGuru" },
						description: { type: "string", example: "We are a team of..." },
						image: { type: "string", example: "uploads/about.jpg" },
						createdAt: { type: "string", format: "date-time" },
						updatedAt: { type: "string", format: "date-time" },
					},
				},
				Order: {
					type: "object",
					properties: {
						_id: { type: "string", example: "60d5ec49f1b2c8b1f8c8e8e8" },
						userId: { type: "string", example: "60d5ec49f1b2c8b1f8c8e8e8" },
						courses: {
							type: "array",
							items: { type: "string" },
						},
						totalAmount: { type: "number", example: 2499 },
						paymentStatus: {
							type: "string",
							enum: ["pending", "paid", "failed"],
							example: "pending",
						},
						orderStatus: {
							type: "string",
							enum: ["processing", "completed", "cancelled"],
							example: "processing",
						},
						createdAt: { type: "string", format: "date-time" },
					},
				},
				Error: {
					type: "object",
					properties: {
						status: { type: "boolean", example: false },
						code: { type: "number", example: 400 },
						message: { type: "string", example: "Error message" },
					},
				},
				HomeContent: {
					type: "object",
					properties: {
						servicesSection: {
							type: "object",
							properties: {
								title: { type: "string" },
								subtitle: { type: "string" },
								items: {
									type: "array",
									items: {
										type: "object",
										properties: {
											label: { type: "string" },
											description: { type: "string" },
											icon: { type: "string" },
										},
									},
								},
							},
						},
						premiumSection: {
							$ref: "#/components/schemas/HomeContent/properties/servicesSection",
						},
						freeSection: {
							$ref: "#/components/schemas/HomeContent/properties/servicesSection",
						},
						updatedBy: { type: "string" },
						createdAt: { type: "string", format: "date-time" },
						updatedAt: { type: "string", format: "date-time" },
						_id: { type: "string" },
						__v: { type: "number" },
					},
				},
			},
		},
		tags: [
			{
				name: "Authentication",
				description:
					"Roles: Public (register, login), User (verify, reset flows)",
			},
			{
				name: "Courses",
				description: "Roles: Public (GET), Admin (create/update/delete)",
			},
			{
				name: "Blogs",
				description: "Roles: Public (GET), Admin (create/update/delete)",
			},
			{
				name: "Orders",
				description:
					"Roles: User (create/my-orders), Admin (list/update statuses)",
			},
			{ name: "Cart", description: "Roles: User (manage own cart)" },
			{ name: "Events", description: "Roles: Public (GET), Admin (manage)" },
			{
				name: "Services",
				description:
					"Roles: Public (GET), Admin (create/update/delete). Includes consultations and packages via serviceType filter",
			},
			{ name: "Books", description: "Roles: Public (GET), Admin (manage)" },
			{ name: "Podcasts", description: "Roles: Public (GET), Admin (manage)" },
			{ name: "Banners", description: "Roles: Public (GET), Admin (manage)" },
			{
				name: "Testimonials",
				description:
					"Roles: Public (GET approved), Admin (manage under /api/admin/testimonials)",
			},
			{ name: "Admin", description: "Roles: Admin only" },
			{ name: "Contact", description: "Roles: Public (submit), Admin (list)" },
			{ name: "About", description: "Roles: Public (GET), Admin (update)" },
			{ name: "Numerology", description: "Roles: Public (GET calculation)" },
			{
				name: "Forums",
				description: "Roles: User (join/post/view for enrolled courses)",
			},
			{
				name: "Notifications",
				description: "Roles: User (view/delete/mark), Admin (create/bulk)",
			},
			{ name: "User", description: "Roles: User (profile, logout)" },
			{ name: "Content", description: "Roles: Public (GET), Admin (update)" },
		],
	},
	apis: ["./routes/*.js", "./controllers/**/*.js", "./docs/*.js"], // Path to the API routes
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
