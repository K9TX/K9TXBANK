import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import bcrypt, { compare } from "bcryptjs";
import nodemailer from "nodemailer";
import { sendEmail } from "../utils/emailService.js";

const otpStorage = {}; // Temporary storage for OTPs

export const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStorage[email] = { otp, expiresAt: Date.now() + 10 * 60 * 1000 }; // Expires in 10 minutes

  // Configure Nodemailer transporter (Use your SMTP settings)
  sendEmail(
    email,
    "Password Reset OTP",
    `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                font-family: Arial, sans-serif;
                background-color: #f7f7f7;
                border-radius: 10px;
            }
            .header {
                background-color: #2c3e50;
                color: white;
                padding: 20px;
                text-align: center;
                border-radius: 5px 5px 0 0;
            }
            .content {
                background-color: white;
                padding: 20px;
                border-radius: 0 0 5px 5px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }
            .otp-code {
                font-size: 32px;
                font-weight: bold;
                color: #2c3e50;
                text-align: center;
                letter-spacing: 5px;
                margin: 20px 0;
                padding: 10px;
                background-color: #f8f9fa;
                border-radius: 5px;
            }
            .footer {
                text-align: center;
                margin-top: 20px;
                font-size: 12px;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>Password Reset Request</h2>
            </div>
            <div class="content">
                <p>Hello,</p>
                <p>We received a request to reset your password. Your OTP (One-Time Password) is:</p>
                <div class="otp-code">${otp}</div>
                <p>This OTP will expire in 10 minutes.</p>
                <p>If you didn't request this password reset, please ignore this email.</p>
            </div>
            <div class="footer">
                <p>This is an automated message, please do not reply.</p>
                <p>&copy; ${new Date().getFullYear()} K9TX-Bank. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `
  );

  try {
    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Error sending OTP" });
  }
});

export const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!otpStorage[email]) {
    res.status(400);
    throw new Error("OTP not requested or expired");
  }

  if (otpStorage[email].otp !== otp) {
    res.status(400);
    throw new Error("Invalid OTP");
  }

  // OTP matched, allow password reset

  // Delete OTP from storage
  delete otpStorage[email];
  res
    .status(200)
    .json({ message: "OTP verified. You can now reset your password." });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { email, newPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Hash the password manually since we're bypassing the pre-save middleware
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  // Update only the password field
  await User.findByIdAndUpdate(
    user._id,
    { password: hashedPassword },
    { runValidators: false }
  );

  res.status(200)
    .json({ message: "Password reset successfully. You can now log in." });
});

export const verifyoldPassword = asyncHandler(async (req, res) => {
  const { email, oldPassword } = req.body;
  console.log(oldPassword);

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (!oldPassword === (await user.matchPassword(oldPassword))) {
    res.status(400);
    throw new Error("Invalid old password");
  }

  res.status(200).json({ message: "Password matched" });
});
