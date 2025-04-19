import { useState } from "react";
import axios from "axios";
import { FaPaperPlane, FaTimes } from "react-icons/fa";

const BlogForm = ({ onBlogAdded }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  const user = JSON.parse(localStorage.getItem("user"));
  const [author] = useState(user?.name || "");
  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      setError("Please provide both title and content");
      return;
    }
    
    setIsSubmitting(true);
    setError("");
    
    try {
      await axios.post(
        `${BASE_URL}/blogs/create`,
        { title, content, author },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      setTitle("");
      setContent("");
      onBlogAdded();
    } catch (error) {
      console.error("Error creating blog:", error);
      setError(error.response?.data?.message || "Failed to create blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {user && (
        <div className="relative mb-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-2xl blur-xl opacity-30"></div>
          
          <form
            onSubmit={handleSubmit}
            className="relative bg-gray-900/90 backdrop-blur-sm border border-gray-800 rounded-2xl shadow-2xl p-8 w-full mx-auto overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            
            {/* Header */}
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent mb-6 text-center">
              Write Your Blog
            </h2>
            
            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}

            {/* Title Input */}
            <div className="mb-5">
              <label className="block text-gray-300 mb-2 font-medium">Blog Title</label>
              <input
                type="text"
                placeholder="Enter an engaging title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 bg-gray-800/70 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                maxLength={100}
              />
              <div className="mt-1 text-right text-xs text-gray-500">
                {title.length}/100 characters
              </div>
            </div>

            {/* Content Textarea */}
            <div className="mb-6">
              <label className="block text-gray-300 mb-2 font-medium">Blog Content</label>
              <textarea
                placeholder="Share your thoughts, expertise, or financial insights..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-56 p-4 bg-gray-800/70 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              ></textarea>
            </div>

            {/* Author Badge */}
            <div className="mb-6">
              <div className="inline-flex items-center bg-blue-900/30 text-blue-300 px-3 py-1.5 rounded-full text-sm border border-blue-800/30">
                <span className="mr-1">Publishing as:</span>
                <span className="font-medium">{author}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-700/30 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Publishing...
                </>
              ) : (
                <>
                  <FaPaperPlane className="mr-2" />
                  Publish Blog
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default BlogForm;
