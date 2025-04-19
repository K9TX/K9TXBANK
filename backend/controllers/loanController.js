import asyncHandler from "express-async-handler";
import Loan from "../models/Loan.js";
import Account from "../models/Account.js";
import { sendEmail } from "../utils/emailService.js";
import User from "../models/User.js";

// Apply for a Loan
export const applyForLoan = asyncHandler(async (req, res) => {
  const { amount, duration, interestRate } = req.body;
  const user = req.user;
  if (!amount || amount <= 0) {
    res.status(400);
    throw new Error("Invalid loan amount");
  }

  const loan = await Loan.create({
    user: req.user._id,
    amount,
    duration,
    interestRate: interestRate || 8.5,
    status: "pending",
  });

  sendEmail(
    user.email,
    "Loan Application Submitted",
    `Hello ${user.name},\n\nYour loan application for $${amount} has been submitted with an interest rate of ${interestRate || 8.5}%.`
  );

  res.json({ message: "Loan application submitted", loan });
});

// Admin Approve/Reject Loan
export const reviewLoan = asyncHandler(async (req, res) => {
  const { loanId, status } = req.body;
  const loann = await Loan.findById(loanId);
  const userId = await loann.user;
  const user = await User.findById(userId);


  if (!loanId || !["approved", "pending", "rejected"].includes(status)) {
    res.status(400);
    throw new Error(" Invalid loan review request ");
  }

  const loan = await Loan.findById(loanId);
  if (!loan) {
    res.status(404);
    throw new Error("Loan not found");
  }

  if (loan.status !== "pending") {
    res.status(400);
    throw new Error("Loan is already reviewed");
  }

  loan.status = status;
  loan.approvedBy = req.user._id;

  if (status === "approved") {
    const account = await Account.findOne({ user: loan.user });

    sendEmail(
      user.email,
      `Your Loan Request has been ${status}`,
      `Hello ${user.name},\n\nYour loan request for $${loan.amount} has been ${status}.`
    )

    if (account) {
      account.balance += loan.amount;
      await account.save();
    }
  }

  await loan.save();

  // Send Email
  sendEmail(
    user.email,
    `Your Loan Request has been ${status}`,
    `Hello ${user.name},\n\nYour loan request for ₹${loan.amount} has been ${status}.`
  );

  res.json({ message: `Loan ${status} successfully`, loan });
});

// Get User Loans
export const getUserLoans = asyncHandler(async (req, res) => {
  const loans = await Loan.find({ user: req.user._id });
  res.json(loans); 
});

// Get All Loan Requests (Admin Only)
export const getAllLoans = asyncHandler(async (req, res) => {
  const loans = await Loan.find().populate("user", "name email");
  res.json(loans);
});

export const LoanStatus = asyncHandler(async (req, res) => {
  const loan = await Loan.find({ user: req.user._id }); 
  res.json(loan);
});
