import asyncHandler from "express-async-handler";
import Notification from "../models/Notification.js";

// Fetch Notifications for a User
export const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(notifications);
});

// Mark Notification as Read
export const markNotificationRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  if (notification) {
    notification.status = "read";
    await notification.save();
    res.json({ message: "Notification marked as read" });
  } else {
    res.status(404);
    throw new Error("Notification not found");
  }
});
