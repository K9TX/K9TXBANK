import BlogCard from "./BlogCard";
import { motion } from "framer-motion";

const BlogList = ({ blogs, onBlogDeleted }) => {
  return (
    <div className="space-y-6">
      {blogs.map((blog, index) => (
        <motion.div
          key={blog._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <BlogCard blog={blog} onBlogDeleted={onBlogDeleted} />
        </motion.div>
      ))}
    </div>
  );
};

export default BlogList;
