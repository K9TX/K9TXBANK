import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

// Middleware to Protect Routes
export const protect = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith("Bearer")) {
    try {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select("-password");
      // console.log(user); 
      
     req.user = user;
      next(); 
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else { 
    res.status(401);
    throw new Error("Not authorized, no token provided");
  }
}); 

// Middleware for Admin-Only Access 
export const adminOnly = (req, res, next) => {
  
  if (req.user && req.user.role === "admin") {
    console.log("Welcome Admin");
     
    next();
  } else {
    res.status(403);
    throw new Error("Access denied, admin only");
  }
};
