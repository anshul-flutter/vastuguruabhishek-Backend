/**
 * This file contains comprehensive Swagger documentation for all API endpoints
 * Import this file in your route files or reference it in swagger config
 */

// Product APIs have been removed. Packages are modelled as Services with serviceType=package.

// ==================== BLOG ROUTES ====================

/**
 * @swagger
 * /api/blogs:
 *   get:
 *     tags: [Blogs]
 *     summary: Get all blogs
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *
 * /api/blogs/create:
 *   post:
 *     tags: [Blogs]
 *     summary: Create a new blog (Admin only)
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Understanding Your Birth Chart"
 *               description:
 *                 type: string
 *               mainImage:
 *                 type: string
 *                 format: binary
 *               sectionImages:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Blog created successfully
 *
 * /api/blogs/{id}:
 *   get:
 *     tags: [Blogs]
 *     summary: Get blog by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog details
 *       404:
 *         description: Blog not found
 *   put:
 *     tags: [Blogs]
 *     summary: Update blog (Admin only)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               mainImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *   delete:
 *     tags: [Blogs]
 *     summary: Delete blog (Admin only)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 */

// ==================== ORDER ROUTES ====================

/**
 * @swagger
 * /api/orders:
 *   post:
 *     tags: [Orders]
 *     summary: Create new order
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courses
 *             properties:
 *               courses:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["60d5ec49f1b2c8b1f8c8e8e8"]
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *   get:
 *     tags: [Orders]
 *     summary: Get all orders (Admin only)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, paid, failed]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of all orders
 *
 * /api/orders/my-orders:
 *   get:
 *     tags: [Orders]
 *     summary: Get current user's orders
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User's orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *
 * /api/orders/{id}:
 *   get:
 *     tags: [Orders]
 *     summary: Get order by ID
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 *       404:
 *         description: Order not found
 *
 * /api/orders/{id}/status:
 *   put:
 *     tags: [Orders]
 *     summary: Update order status (Admin only)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [processing, completed, cancelled]
 *     responses:
 *       200:
 *         description: Order status updated
 *
 * /api/orders/{id}/payment:
 *   put:
 *     tags: [Orders]
 *     summary: Update payment status (Admin only)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentStatus:
 *                 type: string
 *                 enum: [pending, paid, failed]
 *     responses:
 *       200:
 *         description: Payment status updated
 */

// ==================== CART ROUTES ====================

/**
 * @swagger
 * /api/cart:
 *   get:
 *     tags: [Cart]
 *     summary: Get user's cart
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Cart contents
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *   delete:
 *     tags: [Cart]
 *     summary: Clear cart
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *
 * /api/cart/add:
 *   post:
 *     tags: [Cart]
 *     summary: Add product to cart
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 example: "60d5ec49f1b2c8b1f8c8e8e8"
 *               quantity:
 *                 type: number
 *                 example: 1
 *     responses:
 *       200:
 *         description: Product added to cart
 *
 * /api/cart/{productId}:
 *   put:
 *     tags: [Cart]
 *     summary: Update cart item quantity
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Cart item updated
 *   delete:
 *     tags: [Cart]
 *     summary: Remove item from cart
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item removed from cart
 */

// ==================== EVENT ROUTES ====================

/**
 * @swagger
 * /api/events:
 *   get:
 *     tags: [Events]
 *     summary: Get all events
 *     parameters:
 *       - in: query
 *         name: upcoming
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: List of events
 *   post:
 *     tags: [Events]
 *     summary: Create event (Admin only)
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - date
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Event created successfully
 *
 * /api/events/{id}:
 *   get:
 *     tags: [Events]
 *     summary: Get event by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event details
 *   put:
 *     tags: [Events]
 *     summary: Update event (Admin only)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event updated
 *   delete:
 *     tags: [Events]
 *     summary: Delete event (Admin only)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event deleted
 */

// ==================== SERVICE ROUTES ====================

/**
 * @swagger
 * /api/services:
 *   get:
 *     tags: [Services]
 *     summary: Get all services
 *     responses:
 *       200:
 *         description: List of services
 *   post:
 *     tags: [Services]
 *     summary: Create service (Admin only)
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - price
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Birth Chart Reading"
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Service created
 *
 * /api/services/{id}:
 *   get:
 *     tags: [Services]
 *     summary: Get service by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Service details
 *   put:
 *     tags: [Services]
 *     summary: Update service (Admin only)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Service updated
 *   delete:
 *     tags: [Services]
 *     summary: Delete service (Admin only)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Service deleted
 */

// ==================== CONSULTATION ROUTES REMOVED ====================

// ==================== BOOK ROUTES ====================

/**
 * @swagger
 * /api/books:
 *   get:
 *     tags: [Books]
 *     summary: Get all books
 *     responses:
 *       200:
 *         description: List of books
 *   post:
 *     tags: [Books]
 *     summary: Create book (Admin only)
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Book created
 *
 * /api/books/{id}:
 *   get:
 *     tags: [Books]
 *     summary: Get book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book details
 *   put:
 *     tags: [Books]
 *     summary: Update book (Admin only)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book updated
 *   delete:
 *     tags: [Books]
 *     summary: Delete book (Admin only)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted
 */

// ==================== PODCAST ROUTES ====================

/**
 * @swagger
 * /api/podcasts:
 *   get:
 *     tags: [Podcasts]
 *     summary: Get all podcasts
 *     responses:
 *       200:
 *         description: List of podcasts
 *   post:
 *     tags: [Podcasts]
 *     summary: Create podcast (Admin only)
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - url
 *             properties:
 *               title:
 *                 type: string
 *               url:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Podcast created
 *
 * /api/podcasts/{id}:
 *   get:
 *     tags: [Podcasts]
 *     summary: Get podcast by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Podcast details
 *   put:
 *     tags: [Podcasts]
 *     summary: Update podcast (Admin only)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Podcast updated
 *   delete:
 *     tags: [Podcasts]
 *     summary: Delete podcast (Admin only)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Podcast deleted
 */

// ==================== INSTRUCTOR ROUTES REMOVED ====================

// ==================== BANNER ROUTES ====================

/**
 * @swagger
 * /api/banners:
 *   get:
 *     tags: [Banners]
 *     summary: Get all banners
 *     responses:
 *       200:
 *         description: List of banners
 *   post:
 *     tags: [Banners]
 *     summary: Create banner (Admin only)
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Banner created
 *
 * /api/banners/{id}:
 *   get:
 *     tags: [Banners]
 *     summary: Get banner by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Banner details
 *   put:
 *     tags: [Banners]
 *     summary: Update banner (Admin only)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Banner updated
 *   delete:
 *     tags: [Banners]
 *     summary: Delete banner (Admin only)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Banner deleted
 */

// ==================== TESTIMONIAL ROUTES ====================

/**
 * @swagger
 * /api/testimonials:
 *   get:
 *     tags: [Testimonials]
 *     summary: Get all approved testimonials
 *     responses:
 *       200:
 *         description: List of testimonials
 *
 * /api/admin/testimonials:
 *   get:
 *     tags: [Testimonials]
 *     summary: Get all testimonials (Admin only)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, approved, rejected]
 *     responses:
 *       200:
 *         description: List of testimonials
 *   post:
 *     tags: [Testimonials]
 *     summary: Create testimonial (Admin only)
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - content
 *               - rating
 *             properties:
 *               name:
 *                 type: string
 *               content:
 *                 type: string
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *     responses:
 *       201:
 *         description: Testimonial created
 *
 * /api/admin/testimonials/{id}:
 *   get:
 *     tags: [Testimonials]
 *     summary: Get testimonial by ID (Admin only)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Testimonial details
 *   put:
 *     tags: [Testimonials]
 *     summary: Update testimonial (Admin only)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Testimonial updated
 *   delete:
 *     tags: [Testimonials]
 *     summary: Delete testimonial (Admin only)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Testimonial deleted
 *
 * /api/admin/testimonials/{id}/approve:
 *   patch:
 *     tags: [Testimonials]
 *     summary: Approve testimonial (Admin only)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Testimonial approved
 *
 * /api/admin/testimonials/{id}/reject:
 *   patch:
 *     tags: [Testimonials]
 *     summary: Reject testimonial (Admin only)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Testimonial rejected
 */

// ==================== TICKET ROUTES REMOVED ====================

// ==================== ADMIN ROUTES ====================

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     tags: [Admin]
 *     summary: Get all users (Admin only)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [student, astrologer, admin]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of users
 *
 * /api/admin/students/reports:
 *   get:
 *     tags: [Admin]
 *     summary: Get student reports (Admin only)
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Student reports
 *
 * /api/admin/students/bookings:
 *   get:
 *     tags: [Admin]
 *     summary: Get student bookings (Admin only)
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Student bookings
 *
 * /api/admin/students/progress:
 *   get:
 *     tags: [Admin]
 *     summary: Get student progress (Admin only)
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Student progress data
 *
 * /api/admin/customers:
 *   get:
 *     tags: [Admin]
 *     summary: Get all customers (Admin only)
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of customers
 *
 * /api/admin/customers/orders:
 *   get:
 *     tags: [Admin]
 *     summary: Get customer orders (Admin only)
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Customer orders
 *
 * /api/admin/customers/{id}:
 *   get:
 *     tags: [Admin]
 *     summary: Get customer by ID (Admin only)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer details
 *   put:
 *     tags: [Admin]
 *     summary: Update customer (Admin only)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer updated
 *
 * /api/admin/courses/stats:
 *   get:
 *     tags: [Admin]
 *     summary: Get course statistics (Admin only)
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Course statistics
 *
 * /api/admin/orders/stats:
 *   get:
 *     tags: [Admin]
 *     summary: Get order statistics (Admin only)
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Order statistics
 */

// ==================== CONTACT ROUTES ====================

/**
 * @swagger
 * /api/contact:
 *   post:
 *     tags: [Contact]
 *     summary: Submit contact form
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *               phone:
 *                 type: string
 *               message:
 *                 type: string
 *                 example: "I would like to know more about your services"
 *     responses:
 *       201:
 *         description: Contact form submitted successfully
 *   get:
 *     tags: [Contact]
 *     summary: Get all contact queries (Admin only)
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of contact queries
 */

// ==================== ABOUT ROUTES ====================

/**
 * @swagger
 * /api/about:
 *   get:
 *     tags: [About]
 *     summary: Get about us information
 *     responses:
 *       200:
 *         description: About us content
 *   put:
 *     tags: [About]
 *     summary: Update about us (Admin only)
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: About us updated
 */

// ==================== NUMEROLOGY ROUTES ====================

/**
 * @swagger
 * /api/numerology:
 *   get:
 *     tags: [Numerology]
 *     summary: Calculate numerology numbers
 *     parameters:
 *       - in: query
 *         name: fullName
 *         required: true
 *         schema:
 *           type: string
 *         description: Full name of the person
 *         example: "John Doe"
 *       - in: query
 *         name: dob
 *         required: true
 *         schema:
 *           type: string
 *         description: Date of birth in DD-MM-YYYY format
 *         example: "15-08-1990"
 *     responses:
 *       200:
 *         description: Numerology calculations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 lifePathNumber:
 *                   type: number
 *                 destinyNumber:
 *                   type: number
 *                 soulUrgeNumber:
 *                   type: number
 *       400:
 *         description: Invalid input parameters
 */

// ==================== FORUM ROUTES ====================

/**
 * @swagger
 * /api/forums/{courseId}/join-forum:
 *   post:
 *     tags: [Forums]
 *     summary: Join course forum
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Access granted to forum
 *       403:
 *         description: Not enrolled in course
 *
 * /api/forums/{courseId}/messages:
 *   get:
 *     tags: [Forums]
 *     summary: Get forum messages
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Forum messages
 *   post:
 *     tags: [Forums]
 *     summary: Post message to forum
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message posted
 */

// ==================== NOTIFICATION ROUTES ====================

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     tags: [Notifications]
 *     summary: Get user notifications
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: read
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: List of notifications
 *   post:
 *     tags: [Notifications]
 *     summary: Create notification (Admin only)
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - title
 *               - message
 *             properties:
 *               userId:
 *                 type: string
 *               title:
 *                 type: string
 *               message:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Notification created
 *   delete:
 *     tags: [Notifications]
 *     summary: Delete all user notifications
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: All notifications deleted
 *
 * /api/notifications/bulk:
 *   post:
 *     tags: [Notifications]
 *     summary: Create bulk notifications (Admin only)
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userIds
 *               - title
 *               - message
 *             properties:
 *               userIds:
 *                 type: array
 *                 items:
 *                   type: string
 *               title:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Bulk notifications created
 *
 * /api/notifications/read-all:
 *   patch:
 *     tags: [Notifications]
 *     summary: Mark all notifications as read
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: All notifications marked as read
 *
 * /api/notifications/{id}:
 *   get:
 *     tags: [Notifications]
 *     summary: Get notification by ID
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification details
 *   delete:
 *     tags: [Notifications]
 *     summary: Delete notification
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification deleted
 *
 * /api/notifications/{id}/read:
 *   patch:
 *     tags: [Notifications]
 *     summary: Mark notification as read
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification marked as read
 */

// ==================== SESSION ROUTES ====================

/**
 * @swagger
 * /api/sessions/my-sessions:
 *   get:
 *     tags: [Sessions]
 *     summary: Get student's sessions
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of sessions
 *
 * /api/sessions/{courseId}/sessions:
 *   get:
 *     tags: [Sessions]
 *     summary: Get sessions for a course
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of sessions
 *
 * /api/sessions/{sessionId}:
 *   get:
 *     tags: [Sessions]
 *     summary: Get session by ID
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session details
 *
 * /api/sessions/{sessionId}/join:
 *   post:
 *     tags: [Sessions]
 *     summary: Join a session
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Joined session successfully
 *
 * /api/sessions/{sessionId}/leave:
 *   post:
 *     tags: [Sessions]
 *     summary: Leave a session
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Left session successfully
 *
 * /api/sessions/{sessionId}/recording:
 *   get:
 *     tags: [Sessions]
 *     summary: Get session recording
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session recording URL
 *
 * /api/admin/sessions:
 *   get:
 *     tags: [Sessions]
 *     summary: Get all sessions (Admin only)
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of all sessions
 *   post:
 *     tags: [Sessions]
 *     summary: Create a session (Admin only)
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courseId
 *               - title
 *               - startTime
 *             properties:
 *               courseId:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               duration:
 *                 type: number
 *     responses:
 *       201:
 *         description: Session created
 *
 * /api/admin/sessions/{sessionId}:
 *   put:
 *     tags: [Sessions]
 *     summary: Update session (Admin only)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session updated
 *   delete:
 *     tags: [Sessions]
 *     summary: Delete session (Admin only)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session deleted
 *
 * /api/admin/sessions/{sessionId}/start:
 *   post:
 *     tags: [Sessions]
 *     summary: Start session (Admin only)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session started
 *
 * /api/admin/sessions/{sessionId}/end:
 *   post:
 *     tags: [Sessions]
 *     summary: End session (Admin only)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session ended
 *
 * /api/admin/sessions/{sessionId}/attendance:
 *   get:
 *     tags: [Sessions]
 *     summary: Get session attendance (Admin only)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session attendance list
 *
 * /api/admin/sessions/{sessionId}/recording:
 *   post:
 *     tags: [Sessions]
 *     summary: Upload session recording (Admin only)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recording uploaded
 *   delete:
 *     tags: [Sessions]
 *     summary: Remove session recording (Admin only)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recording removed
 */

// ==================== PAYMENT ROUTES ====================

/**
 * @swagger
 * /api/payments/payu/initiate:
 *   post:
 *     tags: [Payments]
 *     summary: Initiate PayU payment
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Payment initiated, returns PayU form data
 *
 * /api/payments/payu/callback:
 *   post:
 *     tags: [Payments]
 *     summary: PayU callback URL
 *     description: Handle PayU success/failure response
 *     responses:
 *       200:
 *         description: Callback processed
 *
 * /api/payments/payu/verify-order/{orderId}:
 *   get:
 *     tags: [Payments]
 *     summary: Verify order payment status
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment verification result
 */

// ==================== KUNDLI ROUTES ====================

/**
 * @swagger
 * /api/kundli/generate:
 *   post:
 *     tags: [Kundli]
 *     summary: Generate complete Kundli
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - day
 *               - month
 *               - year
 *               - hour
 *               - min
 *               - lat
 *               - lon
 *               - tzone
 *             properties:
 *               day:
 *                 type: number
 *               month:
 *                 type: number
 *               year:
 *                 type: number
 *               hour:
 *                 type: number
 *               min:
 *                 type: number
 *               lat:
 *                 type: number
 *               lon:
 *                 type: number
 *               tzone:
 *                 type: number
 *     responses:
 *       200:
 *         description: Kundli data generated
 *
 * /api/kundli/planets:
 *   post:
 *     tags: [Kundli]
 *     summary: Get planetary positions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Planetary positions
 *
 * /api/kundli/chart:
 *   post:
 *     tags: [Kundli]
 *     summary: Get birth chart SVG
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Chart SVG
 *
 * /api/kundli/nakshatra:
 *   post:
 *     tags: [Kundli]
 *     summary: Get nakshatra details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Nakshatra details
 *
 * /api/kundli/dasha:
 *   post:
 *     tags: [Kundli]
 *     summary: Get dasha details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Dasha details
 */

// ==================== CHAT ROUTES ====================

/**
 * @swagger
 * /api/chats/chat:
 *   get:
 *     tags: [Chat]
 *     summary: Get chat messages
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: targetUserId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chat history
 */

// ==================== USER ROUTES ====================

/**
 * @swagger
 * /api/me:
 *   get:
 *     tags: [User]
 *     summary: Get current user profile
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Current user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 code:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       401:
 *         description: Unauthorized
 *
 * /api/logout:
 *   post:
 *     tags: [User]
 *     summary: Logout user
 *     responses:
 *       200:
 *         description: Logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Logged out successfully"
 */
