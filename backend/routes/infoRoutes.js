import express from "express";
import {Contactus, getUserById, getUsers, updateUser, updateUserProfilePicture} from "../controllers/userController.js"
import { adminOnly, protect } from "../middleware/authMiddleware.js";
import { getProfile, serverReady } from "../controllers/authController.js";
import { getAccountDetails, getAccountDetailsall } from "../controllers/accountController.js";
import { upload } from "../middleware/multerMiddleware.js";

const router = express.Router();

router.get("/getusers", protect, getUsers);
router.get("/ready",serverReady);
router.post("/getuser", protect, getUserById);
router.get("/profile", protect, getProfile);
router.put("/update-User", protect, updateUser);
router.post("/admin", protect, adminOnly, getProfile);
router.post("/getaccountdetails", protect, getAccountDetailsall);
router.post("/contact",Contactus);
router.post(
  "/profile-update",
  protect,
  upload.single("profilePhoto"),
  updateUserProfilePicture
);

export default router;
