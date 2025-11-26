import express from "express";
import { getAboutUs } from "../controllers/AboutUs/GetAboutUs.js";
import upload from "../middlewares/upload.js";
import { updateAboutUs } from "../controllers/AboutUs/UpdateAboutUs.js";
import { adminMiddleware } from "../middlewares/adminAuthMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/about:
 *   get:
 *     tags: [About]
 *     summary: Get About Us information
 *     description: Retrieve the About Us page content
 *     responses:
 *       200:
 *         description: About Us information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/AboutUs'
 *   put:
 *     tags: [About]
 *     summary: Update About Us information (Admin only)
 *     description: Update the About Us page content and image
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
 *                 example: "About VastuGuru"
 *               description:
 *                 type: string
 *                 example: "We are a team of..."
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: About Us updated successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/", getAboutUs);
router.put("/", adminMiddleware, upload.single("image"), updateAboutUs);

export default router;
