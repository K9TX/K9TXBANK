import express from "express";
import {
  getNotifications,
  markNotificationRead,
} from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getNotifications); // Get all notifications
router.put("/:id", protect, markNotificationRead); // Mark as read

export default router;
