import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { 
  RiShieldCheckLine, 
  RiCurrencyLine, 
  RiLightbulbFlashLine, 
  RiCustomerService2Line,
  RiSecurePaymentLine,
  RiPhoneLine,
  RiBookLine
} from "react-icons/ri";

const FeatureCard = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-xl overflow-hidden group"
    >
      {/* Decorative gradient orb */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all duration-700"></div>
      
      {/* Icon container */}
      <div className="relative z-10 mb-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl">
          {icon}
        </div>
      </div>
      
      {/* Content */}
      <h3 className="relative z-10 text-xl font-bold text-white mb-2">{title}</h3>
      <p className="relative z-10 text-gray-300">{description}</p>
      
      {/* Border gradient */}
      <div className="absolute inset-0 rounded-xl border border-transparent bg-gradient-to-br from-blue-500/0 to-purple-600/0 group-hover:from-blue-500/30 group-hover:to-purple-600/30 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
    </motion.div>
  );
};

const AboutUs = () => {
  const navigate = useNavigate();
  const { authUser: user } = useAuthContext();
  
  const features = [
    {
      icon: <RiShieldCheckLine />,
      title: "Unmatched Security",
      description: "Advanced encryption and multi-factor authentication keep your assets safer than ever.",
    },
    {
      icon: <RiCurrencyLine />,
      title: "Zero Hidden Fees",
      description: "Transparent banking with no surprise charges or minimum balance requirements.",
    },
    {
      icon: <RiLightbulbFlashLine />,
      title: "Smart Banking Tools",
      description: "AI-powered financial insights help you save, invest, and grow your wealth.",
    },
    {
      icon: <RiCustomerService2Line />,
      title: "24/7 Support",
      description: "Real human support available around the clock, whenever you need assistance.",
    },
    {
      icon: <RiSecurePaymentLine />,
      title: "Instant Transfers",
      description: "Send money globally in seconds with the lowest transaction fees in the industry.",
    },
    {
      icon: <RiPhoneLine />,
      title: "Modern Mobile App",
      description: "Award-winning banking app with intuitive design and powerful features.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-20 px-6">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
              className="relative mb-6 mx-auto"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 blur-xl opacity-30 animate-pulse"></div>
              <div className="relative w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-white">K9</span>
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-5xl md:text-6xl font-extrabold mb-4"
            >
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Why </span>
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">K9TX BANK</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
              Experience the future of banking with cutting-edge technology and customer-first approach
            </motion.p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={0.1 * index}
            />
          ))}
        </div>

        {/* Testimonials Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl p-8 mb-16 backdrop-blur-sm border border-gray-800/50"
        >
          <h2 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Johnson",
                role: "Small Business Owner",
                comment: "K9TX's business tools have revolutionized how I manage my company finances. The automated invoicing alone saves me hours every week.",
              },
              {
                name: "James Wilson",
                role: "Frequent Traveler",
                comment: "No other bank handles international transactions as seamlessly. Zero foreign transaction fees and real-time currency conversion are game-changers.",
              },
              {
                name: "Michelle Rivera",
                role: "Tech Professional",
                comment: "The security features at K9TX are unmatched. Biometric authentication and instant fraud alerts give me peace of mind.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50"
              >
                <div className="flex flex-col h-full">
                  <div className="flex-grow">
                    <p className="text-gray-300 italic">"{testimonial.comment}"</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-blue-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { value: "99.99%", label: "Uptime" },
            { value: "24/7", label: "Support" },
            { value: "2M+", label: "Customers" },
            { value: "$0", label: "Monthly Fee" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 p-6 rounded-xl text-center backdrop-blur-sm border border-gray-800/50"
            >
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-gray-400 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Sections */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Blog Promotion Section */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 p-8 rounded-xl backdrop-blur-sm border border-blue-800/30"
          >
            <div className="flex items-start">
              <div className="mr-4 bg-blue-600/30 p-3 rounded-lg">
                <RiBookLine className="text-3xl text-blue-300" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">Explore Our Blog</h3>
                <p className="text-gray-300 mb-6">
                  Stay updated with the latest financial trends, investment tips, and
                  banking innovations from our experts.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg"
                  onClick={() => navigate("/blog")}
                >
                  Read Our Blog
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Contact Us Section */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 p-8 rounded-xl backdrop-blur-sm border border-purple-800/30"
          >
            <div className="flex items-start">
              <div className="mr-4 bg-purple-600/30 p-3 rounded-lg">
                <RiPhoneLine className="text-3xl text-purple-300" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">Need Assistance?</h3>
                <p className="text-gray-300 mb-6">
                  Our customer support team is ready to help you with any questions
                  or concerns you might have.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-bold py-3 px-6 rounded-lg"
                  onClick={() => navigate("/contact")}
                >
                  Contact Us
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Join Now CTA */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Ready to experience better banking?
          </h2>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg font-bold py-4 px-10 rounded-full shadow-lg shadow-blue-500/20"
            onClick={() => navigate(user ? "/dashboard" : "/register")}
          >
            {user ? "Go to Dashboard" : "Open an Account"}
          </motion.button>
          
          <p className="text-gray-400 mt-4">
            Join over 2 million satisfied customers today.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
