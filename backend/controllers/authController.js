import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Account from "../models/Account.js";
import generateToken from "../utils/generateToken.js";
import { sendEmail } from "../utils/emailService.js";
import Notification from "../models/Notification.js";
import { getAccountDetails } from "./accountController.js";


export const serverReady = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Server is ready" });
})
// Register New User
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, balance = 0 } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Generate default profile picture
  const [firstName, lastName] = name.split(" ");
  const defaultProfilePhoto = `https://api.dicebear.com/9.x/initials/svg?seed=${
    firstName || "User"
  }+${lastName || ""}`;

  const user = await User.create({
    name,
    email,
    password,
    role: "user",
    accountId: null,
    profilePhoto: defaultProfilePhoto,
  });
  const account = await Account.create({
    user: user._id,
    accountNumber: Math.floor(Math.random() * 900000000000) + 100000000000,
    balance: balance,
  });

  console.log("✅ Account created successfully");

  if (user) {
    // Automatically create an account for the user

    user.accountId = account._id;
    await user.save();

    sendEmail(
      email,
      "Welcome to Our K9TX Banking System",
      `Hello ${name},\n\nYour account has been created successfully!`
    );

    // ✅ Adding Welcome Notification
    const welcomeNotification = new Notification({
      user: user._id,
      message: `🎉 Welcome to our banking system, ${name}! Your account has been created successfully.`,
      type: "welcome",
    });

    await welcomeNotification.save();

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profilePhoto: user.profilePhoto,
      account: account,
      accountNumber: account.accountNumber,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// User Login
export const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // First check if user exists
    const user = await User.findOne({ email });
    
    if (!user) {
      res.status(401);
      throw new Error("Invalid email or password");
    }
    
    // Then check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      res.status(401);
      throw new Error("Invalid email or password");
    }
    
    // Generate token after password matches
    const token = generateToken(user._id);
    
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    
    // Use try/catch for each additional operation that might fail
    let account = null;
    try {
      account = user.accountId ? await Account.findById(user.accountId) : null;
    } catch (err) {
      console.error("Error fetching account:", err);
      // Continue even if account fetch fails
    }
    
    // Try to add notification, but don't fail login if it errors
    try {
      const loginNotification = new Notification({
        user: user._id,
        message: `Your account has been logged in! If it's not you, please change your password`,
        type: "login",
      });
      await loginNotification.save();
    } catch (err) {
      console.error("Error creating notification:", err);
      // Continue login process
    }
    
    // Prepare profile photo regardless of notification success
    const name = user.name || "";
    const [firstName, lastName] = name.split(" ");
    const defaultProfilePhoto = `https://api.dicebear.com/9.x/initials/svg?seed=${
      firstName || "User"
    }+${lastName || ""}`;
    
    // Send response
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      account: account,
      token: token,
      profilePhoto: user.profilePhoto || defaultProfilePhoto,
    });
    
    // Try to send email but don't fail login if it errors
    try {
      sendEmail(
        email,
        "K9TX-Banking-System Logged In !!!",
        `Your account has been logged in! If it's not you, please change your password`
      );
    } catch (err) {
      console.error("Error sending email:", err);
      // Continue login process
    }
    
    console.log("✅ User logged in successfully");
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      message: "Login failed",
      error: error.message
    });
  }
});

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("accountId");
  const account = await Account.findById(user.accountId);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      accountId: user.accountId,
      account: account,
      
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

