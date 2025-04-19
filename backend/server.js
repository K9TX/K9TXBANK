import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";
import { createAdminIfNotExists } from "./controllers/userController.js";
import LoanRoutes from "./routes/LoanRoutes.js";
import CookieParser from "cookie-parser";
import notificationRoutes from "./routes/notificationRoutes.js";
import infoRoutes from "./routes/infoRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import blogRoutes from "./routes/blogroutes.js";
import forgetPasswordRoutes from "./routes/forgetPasswordRoutes.js";
// ..........................................................................................

dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Middleware
// console.log("admin:")
app.use(express.json());
app.use(CookieParser());
app.use(
  cors({
    origin: `${process.env.FRONTEND_URL}`, // Change to your frontend URL
    credentials: true, // ALLOW cookies
  })
);
app.use(morgan("dev"));

//socketio
import { Server } from "socket.io";
import http from "http";


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: `${process.env.FRONTEND_URL}`,
    methods: ["GET", "POST"],
    credentials: true,
  },
  allowEIO3: true,
});

// WebSocket Event Handling
io.on("connection", (socket) => {
  console.log("user Connected", socket.id);

  socket.on("joinRoom", (userId) => {


    socket.join(userId);
    console.log(`User ${userId} joined room`);
  });


  socket.on("disconnect", () => {
    console.log("user Disconnected", socket.id);
  });
});


createAdminIfNotExists();

// ........................

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/account", accountRoutes);
app.use("/api/loan", LoanRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/info",infoRoutes)
app.use("/api/transaction", transactionRoutes);
app.use("/blogs",blogRoutes)
app.use("/forget", forgetPasswordRoutes);


// Basic Route
app.get("/", (req, res) => {
  res.send("Banking System Backend is Running....");
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

export { io };