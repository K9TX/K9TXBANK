import express from "express";
import {
  forgetPassword,
  verifyOtp,
  resetPassword,
  verifyoldPassword,
} from "../controllers/forgetPasswordController.js";

const router = express.Router();

router.post("/forget-password", forgetPassword); // Send OTP
router.post("/verify-otp", verifyOtp); // Verify OTP
router.post("/reset-password", resetPassword); // Reset password
router.post("/verify-old", verifyoldPassword); // Verify old password

export default router;
