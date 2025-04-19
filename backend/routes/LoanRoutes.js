import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  applyForLoan,
  reviewLoan,
  getUserLoans,
  getAllLoans,
  LoanStatus,
} from "../controllers/loanController.js";

const router = express.Router();

router.post("/apply", protect, applyForLoan);
router.post("/review", protect, adminOnly, reviewLoan);
router.get("/", protect, getUserLoans);
router.get("/all", protect, adminOnly, getAllLoans);
router.get("/loan-status",protect,LoanStatus);

export default router;
