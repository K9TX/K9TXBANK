import axios from "axios";
import { format } from "date-fns";
import { useState } from "react";
import { FaTrash, FaUserCircle, FaClock, FaEllipsisV } from "react-icons/fa";

const BlogCard = ({ blog, onBlogDeleted }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [expanded, setExpanded] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
  
  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    
    try {
      await axios.delete(`${BASE_URL}/${blog._id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      onBlogDeleted();
    } catch (error) {
      console.error("Error deleting blog:", error);
    } finally {
      setConfirmDelete(false);
    }
  };

  // Get a random pastel color based on the author's name
  const getAuthorColor = () => {
    const colors = [
      'from-blue-500/20 to-blue-600/20 border-blue-500/30',
      'from-purple-500/20 to-purple-600/20 border-purple-500/30',
      'from-teal-500/20 to-teal-600/20 border-teal-500/30',
      'from-pink-500/20 to-pink-600/20 border-pink-500/30',
      'from-amber-500/20 to-amber-600/20 border-amber-500/30',
      'from-emerald-500/20 to-emerald-600/20 border-emerald-500/30',
      'from-indigo-500/20 to-indigo-600/20 border-indigo-500/30'
    ];
    
    // Use the author name to pick a consistent color
    const charSum = blog.author.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[charSum % colors.length];
  };

  const authorColor = getAuthorColor();
  const dateFormatted = format(new Date(blog.createdAt), "MMM dd, yyyy");
  
  // Check if content is long
  const isLongContent = blog.content.length > 250;
  const displayContent = expanded ? blog.content : blog.content.slice(0, 250) + (isLongContent ? '...' : '');

  return (
    <div className="group relative mb-8 overflow-hidden">
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${authorColor} blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
      
      <div className="relative backdrop-blur-sm bg-gray-900/80 border border-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
        {/* Blog Header */}
        <div className="p-6 pb-4">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-3">
            {blog.title}
          </h3>
          
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center text-gray-400">
              <FaUserCircle className="mr-2 text-blue-400" />
              <span className="font-medium text-blue-300">{blog.author}</span>
            </div>
            
            <div className="flex items-center text-gray-400">
              <FaClock className="mr-2" />
              <span>{dateFormatted}</span>
            </div>
          </div>
        </div>
        
        {/* Blog Content */}
        <div className="px-6 py-2">
          <p className="text-gray-300 leading-relaxed whitespace-pre-line">
            {displayContent}
          </p>
          
          {isLongContent && (
            <button 
              onClick={() => setExpanded(!expanded)}
              className="mt-2 text-blue-400 hover:text-blue-300 text-sm font-medium focus:outline-none transition-colors"
            >
              {expanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 bg-black/20 flex justify-between items-center">
          <div className="text-xs text-gray-500">
            ID: {blog._id.substring(0, 8)}...
          </div>
          
          {/* Delete Button (Only for the Author) */}
          {user?.name === blog.author && (
            <button
              onClick={handleDelete}
              className={`flex items-center px-3 py-1.5 rounded-full text-sm transition-all duration-200 ${
                confirmDelete 
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <FaTrash className={`mr-1.5 ${confirmDelete ? "text-white" : "text-red-500"}`} />
              {confirmDelete ? "Confirm Delete" : "Delete"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
