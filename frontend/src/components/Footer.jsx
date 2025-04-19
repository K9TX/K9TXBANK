import React from "react";
import { useAuthContext } from "../context/AuthContext";
import useScreenSize from "../hooks/Usescreensize";
import { 
  FaGithub, 
  FaLinkedin, 
  FaInstagram, 
  FaDiscord, 
  FaArrowRight,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaLock,
  FaStar
} from "react-icons/fa";
import { RiBankFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Footer = () => {
  const { authUser: user } = useAuthContext();
  const { width } = useScreenSize();
  const currentYear = new Date().getFullYear();

  // Social media links
  const socialLinks = [
    { icon: <FaGithub />, url: "https://github.com/k9tx", label: "GitHub" },
    { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/k9tx/", label: "LinkedIn" },
    { icon: <FaInstagram />, url: "https://www.instagram.com/kartik_t.exe/profilecard/?igsh=MXExd3I1enNkcXloNQ==", label: "Instagram" },
    { icon: <FaDiscord />, url: "https://x.com/K9TXS", label: "Discord" }
  ];

  // Quick links categories
  const linkCategories = [
    {
      title: "Services",
      links: [
        { label: "Branding", url: "/branding" },
        { label: "Design", url: "/design" },
        { label: "Marketing", url: "/marketing" },
        { label: "Advertisement", url: "/about" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", url: "/about" },
        { label: "Contact", url: "/contact" },
        { label: "Jobs", url: "/jobs" },
        { label: "Press Kit", url: "/presskit" }
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Use", url: "/terms" },
        { label: "Privacy Policy", url: "/about" },
        { label: "Cookie Policy", url: "/about" }
      ]
    }
  ];

  return (
    <footer className="relative bg-black overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
      <div className="absolute top-0 inset-x-0 flex justify-center">
        <div className="w-[40rem] h-[20rem] bg-blue-500/10 blur-[100px] rounded-full -translate-y-1/2"></div>
      </div>
      
      {/* Newsletter Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-xl mb-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left max-w-md">
              <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
              <p className="text-gray-300">Get the latest news and updates from K9TX Bank delivered to your inbox.</p>
            </div>
            
            <div className="w-full md:w-auto">
              <form className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <div className="relative flex-grow">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="w-full bg-gray-900/80 border border-gray-700 rounded-lg py-3 px-4 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FaEnvelope />
                  </div>
                </div>
                <button type="submit" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center whitespace-nowrap">
                  Subscribe <FaArrowRight className="ml-2 text-sm" />
                </button>
              </form>
              <p className="text-gray-500 text-xs mt-2 text-center sm:text-left">We respect your privacy. Unsubscribe at any time.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column (larger on desktop) */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="mr-3 relative">
                <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-sm"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                  <RiBankFill className="text-white text-xl" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">K9TX Bank</h2>
                <p className="text-gray-400 text-sm">Secure Financial Solutions</p>
              </div>
            </div>
            
            <p className="text-gray-400 mb-6 max-w-md">
              K9TX Bank provides cutting-edge banking solutions designed to meet your financial needs. With state-of-the-art security and intuitive interfaces, we make banking effortless.
            </p>
            
            {/* Contact Information */}
            <div className="space-y-3 mb-8">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-blue-400 mt-1 mr-3" />
                <span className="text-gray-300">Bombay stock exchange, Mumbai, Maharashtra, India</span>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-blue-400 mr-3" />
                <span className="text-gray-300">+91 9876543210</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-blue-400 mr-3" />
                <span className="text-gray-300">info@k9txbank.com</span>
              </div>
            </div>
            
            {/* Social Media Links */}
            <div>
              <p className="text-gray-300 font-medium mb-3">Connect with us</p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-gray-700 text-blue-400 hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Quick Links Columns */}
          {linkCategories.map((category, index) => (
            <div key={index}>
              <h6 className="text-lg font-semibold text-white mb-4 flex items-center">
                {category.title}
                <div className="ml-2 h-px w-10 bg-blue-500/50"></div>
              </h6>
              <ul className="space-y-3">
                {category.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.url} 
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                    >
                      <span className="w-1 h-1 bg-gray-600 rounded-full mr-2 group-hover:bg-blue-400 transition-colors"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Trust Badges */}
        <div className="mt-16 border-t border-gray-800 pt-8 flex flex-wrap justify-center gap-6">
          <div className="flex items-center px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700/50">
            <FaLock className="text-green-400 mr-2" />
            <span className="text-gray-300 text-sm">256-bit SSL Security</span>
          </div>
          <div className="flex items-center px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700/50">
            <FaStar className="text-yellow-400 mr-2" />
            <span className="text-gray-300 text-sm">5-Star Rated App</span>
          </div>
          <div className="flex items-center px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700/50">
            <svg className="h-5 w-5 text-blue-400 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-gray-300 text-sm">DICGC Insured</span>
          </div>
        </div>

        {/* Copyright & Credits */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} K9TX Bank. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Designed & Developed by Kartik Tripathi
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
