import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import UseLogout from "../hooks/UseLogout";
import useScreenSize from "../hooks/Usescreensize";
import { useNotificationContext } from "../context/NotificationContext";
import NotificationDropdown from "./NotificationDropdown";
import { BsQrCodeScan } from "react-icons/bs";
import { 
  RiBankFill, 
  RiMenuLine, 
  RiCloseLine, 
  RiHome4Line, 
  RiInformationLine, 
  RiArticleLine, 
  RiContactsLine,
  RiUser3Line,
  RiLoginBoxLine,
  RiLogoutBoxLine
} from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ profilePhoto = "/logo.png" }) => {
  const { authUser: user } = useAuthContext();
  const { logout, loading } = UseLogout();
  const { width } = useScreenSize();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Check scroll position to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: "/dashboard", label: "Home", icon: <RiHome4Line /> },
    { to: "/about", label: "About", icon: <RiInformationLine /> },
    { to: "/blog", label: "Blog", icon: <RiArticleLine /> },
    { to: "/contact", label: "Contact", icon: <RiContactsLine /> },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-md shadow-lg py-2"
          : "bg-gradient-to-r from-gray-900 to-black py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="relative">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.3
                }}
                className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 blur-sm opacity-70"
              ></motion.div>
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="relative w-10 h-10 flex items-center justify-center bg-blue-900 rounded-full"
              >
                <RiBankFill className="text-2xl text-white" />
              </motion.div>
            </div>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-baseline"
            >
              <span className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                K9TX
              </span>
              <span className="font-light text-lg sm:text-xl text-blue-400">BANK</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          {width >= 768 && (
            <div className="hidden md:flex space-x-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -2 }}
                >
                  <Link
                    to={link.to}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-1 transition-colors ${
                      location.pathname === link.to
                        ? "text-blue-400"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                    {location.pathname === link.to && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {user && (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="scan-QR" className="text-gray-300 hover:text-white">
                  <BsQrCodeScan className="text-xl" />
                </Link>
              </motion.div>
            )}

            {user && <NotificationDropdown />}

            {/* Profile menu */}
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="dropdown dropdown-end"
              >
                <div
                  tabIndex={0}
                  role="button"
                  className="relative cursor-pointer outline-none"
                >
                  {user && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-sm opacity-70"
                    ></motion.div>
                  )}
                  <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-gray-700">
                    <img
                      alt="Profile"
                      src={user?.profilePhoto || "/logo.png"}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow-xl bg-gray-800/95 backdrop-blur-md rounded-xl w-52 mt-4 border border-gray-700"
                >
                  <li>
                    {user ? (
                      <Link to="/profile" className="flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700/50 rounded-lg">
                        <RiUser3Line className="mr-2" />
                        Profile
                      </Link>
                    ) : (
                      <Link to="/login" className="flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700/50 rounded-lg">
                        <RiLoginBoxLine className="mr-2" />
                        Login
                      </Link>
                    )}
                  </li>
                  {!user && (
                    <li>
                      <Link to="/register" className="flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700/50 rounded-lg">
                        <RiUser3Line className="mr-2" />
                        Register
                      </Link>
                    </li>
                  )}
                  {user && (
                    <li>
                      <button 
                        onClick={logout} 
                        className="flex items-center px-4 py-2 text-gray-200 hover:bg-gray-700/50 rounded-lg w-full text-left"
                      >
                        <RiLogoutBoxLine className="mr-2" />
                        {loading ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                          "Logout"
                        )}
                      </button>
                    </li>
                  )}
                </ul>
              </motion.div>
            </div>

            {/* Mobile menu button */}
            {width < 768 && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
              >
                {mobileMenuOpen ? (
                  <RiCloseLine className="block h-6 w-6" />
                ) : (
                  <RiMenuLine className="block h-6 w-6" />
                )}
              </motion.button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {width < 768 && mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 mt-3 bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700/50">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.to}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <Link
                      to={link.to}
                      className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                        location.pathname === link.to
                          ? "text-blue-400 bg-gray-700/50"
                          : "text-gray-300 hover:bg-gray-700/30 hover:text-white"
                      }`}
                    >
                      <span className="mr-3">{link.icon}</span>
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
