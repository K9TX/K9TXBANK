import express from "express";
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id", protect,getBlogById);
router.post("/create", protect,createBlog);
router.delete("/:id", protect,deleteBlog);

export default router;
