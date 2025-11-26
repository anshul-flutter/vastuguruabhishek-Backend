import express from "express";
import { adminMiddleware } from "../middlewares/adminAuthMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
	getHomeContent,
	upsertHomeContent,
} from "../controllers/Service/HomeContentController.js";

const router = express.Router();

// Public fetch
router.get("/home-content", getHomeContent);

// Admin update
router.put("/home-content", authMiddleware, adminMiddleware, upsertHomeContent);

export default router;
