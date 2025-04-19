import { useEffect, useState } from "react";
import axios from "axios";
import BlogForm from "../components/BlogForm";
import BlogList from "../components/BlogList";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaPen, FaBlog, FaFeatherAlt } from "react-icons/fa";
import Goback from "../components/Goback";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [open, setOpen] = useState(false);
  const {authUser:user} = useAuthContext(); 
  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
  const [loading, setLoading] = useState(true);
  
  const handleCreateBlog = () => {
    if(user !== null){
        setOpen(!open);
    }
    else{
        toast.error("Please login to create a blog");
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/blogs`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header with animated gradient */}
      <div className="relative bg-black">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 opacity-30"></div>
        <div className="absolute inset-0 bg-[url('/pattern-dot.png')] opacity-10"></div>
        <div className="relative max-w-5xl mx-auto px-4 py-20 sm:py-24 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Goback />
              <div className="ml-4">
                <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent sm:text-5xl lg:text-6xl">
                  K9TX Blog
                </h1>
                <p className="mt-3 text-gray-400 text-lg sm:text-xl">
                  Financial insights and banking trends
                </p>
              </div>
            </div>
          </div>
          
          <div className="w-40 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-8"></div>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto px-4 pb-20 sm:px-6 -mt-10">
        {/* Create blog button */}
        <div className="sticky top-20 z-10 flex justify-end mb-6">
          <button
            onClick={handleCreateBlog}
            className={`flex items-center gap-2 px-5 py-3 rounded-full shadow-lg transition-all duration-300 ${
              open 
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            } text-white font-medium`}
          >
            {open ? (
              <>
                <IoIosCloseCircleOutline className="text-xl" />
                <span>Close</span>
              </>
            ) : (
              <>
                <FaFeatherAlt />
                <span>Write New Blog</span>
              </>
            )}
          </button>
        </div>
        
        {/* Blog form */}
        {open && <BlogForm onBlogAdded={fetchBlogs} />}
        
        {/* Blog content */}
        <div className={`transition-all duration-500 ${open ? 'opacity-50' : 'opacity-100'}`}>
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              {blogs.length === 0 ? (
                <div className="text-center py-20 px-4">
                  <FaBlog className="mx-auto text-5xl text-gray-600 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-300 mb-2">No blogs yet</h3>
                  <p className="text-gray-400 max-w-md mx-auto">
                    Be the first to share your financial insights and expertise with our community.
                  </p>
                  {user && (
                    <button
                      onClick={handleCreateBlog}
                      className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full transition-colors duration-300"
                    >
                      Write Your First Blog
                    </button>
                  )}
                </div>
              ) : (
                <BlogList blogs={blogs} onBlogDeleted={fetchBlogs} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
