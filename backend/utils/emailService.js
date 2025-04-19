import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create Transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  secure:"true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send Email Function
export const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: `"K9TX Banking System" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(" Email sending failed:", error);
  }
};
