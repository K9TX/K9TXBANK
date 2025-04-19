import Blog from "../models/Blog.js";
import Notification from "../models/Notification.js";
import { io } from "../server.js";
import { sendEmail } from "../utils/emailService.js";
import User from "../models/User.js";

// Fetch all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single blog by ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new blog
export const createBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const userId = req.user.id;
    const user =  await User.findById(userId);
    const newBlog = new Blog({ title, content, author });
    await newBlog.save();

    const blogNotification = new Notification({
        user: user._id,
        message: `You have successfully create a blog: ${title}`,
        type: "other",
      });
    
      const notification = await blogNotification.save();
      
    //   const userId = user._id;
      if (notification) {
        console.log("Notification saved successfully");
    
        // Emit event to frontend in real-time
        io.to(userId.toString()).emit("newNotification", notification);
      }
    
      const email = user.email;
    
      sendEmail(
        email,
        "Blog Notification",
        ` You have successfully Created a blog: ${title}`   
      );


    res.status(201).json({newBlog, user});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a blog
export const deleteBlog = async (req, res) => {
  try {
    
    // Check if the logged-in user is the author
    
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
