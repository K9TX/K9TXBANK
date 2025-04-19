import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Contact from "../pages/Contact";
import { TypeAnimation } from "react-type-animation";
import toast from "react-hot-toast";
import axios from "axios"
const Home = () => {
  const { authUser: user } = useAuthContext();
  const [isReady, setIsReady] = React.useState(false);

  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

  React.useEffect(() => {
    let toastId;
    if (!isReady) {
      toastId = toast.loading("Please wait, Connecting to the server...");
      return () => toast.dismiss(toastId);
    }
  }, [isReady]);

  React.useEffect(() => {
    const checkbackendStatus = async () => {
      try {
        const res =await axios.get(`${BASE_URL}/api/info/ready`, {
          withCredentials: true,
        });

        if (res.status === 200) {
          setIsReady(true);
          toast.dismiss(); // Remove loading toast
          toast.success("Connected to Bank server! ✅");
        }
      } catch (error) {
        setTimeout(

          console.error("Failed to check backend status."),
          20000
        )
      }
    };

    checkbackendStatus();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div
        className="relative h-screen w-full bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url(/bgwal.png)" }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-2xl px-6">
          <h1 className="text-5xl font-extrabold mb-4 animate-fadeIn">
            Welcome to <span className="text-blue-400">K9TX-Bank</span>
          </h1>
          <h2 className="font-extrabold h-20 text-4xl bg-clip-text text-transparent m-5 bg-gradient-to-l from-blue-600 to-purple-400">
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed once, initially
                "  Secure Banking",
                2000,
                "  Easy Transactions",
                2000,
                "  Transparent Loan System",
                2000,
              ]}
              speed={5}
              style={{ fontSize: "1em" }}
              repeat={Infinity}
            />
          </h2>
          <p className="text-lg text-gray-300 mb-6 animate-fadeIn delay-200">
            Experience a secure and user-friendly banking platform designed for
            seamless financial operations. Manage transactions, apply for loans,
            and more—all with enhanced security.
          </p>
          <Link to={user ? "/dashboard" : "/login"}>
            <button className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md transition-transform transform hover:scale-105 animate-bounce">
              🚀 Get Started
            </button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <section className="bg-black py-16 px-8 text-center text-gray-300">
        <h2 className="text-4xl font-bold text-blue-400 mb-6">
          Why Choose <span className="text-white">K9TX-Bank?</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
            <h3 className="text-xl font-semibold text-blue-300">
              🔐 Secure Banking
            </h3>
            <p className="mt-2 text-gray-400">
              State-of-the-art security to protect your money and data.
            </p>
          </div>
          <div className="p-6 bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
            <h3 className="text-xl font-semibold text-blue-300">
              💳 Easy Transactions
            </h3>
            <p className="mt-2 text-gray-400">
              Send & receive money instantly with just a few clicks.
            </p>
          </div>
          <div className="p-6 bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
            <h3 className="text-xl font-semibold text-blue-300">
              📜 Transparent Loan System
            </h3>
            <p className="mt-2 text-gray-400">
              Apply for and track loans with clear, fair policies.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Promotion Section */}
      <section className="bg-black border-t border-gray-800  py-16 px-8 text-center text-gray-300">
        <h2 className="text-3xl font-bold text-blue-400 mb-4">
          📢 Explore Our Blog
        </h2>
        <p className="text-lg text-gray-400">
          Stay updated with the latest financial trends, investment tips, and
          banking insights. Read blogs from experts and share your thoughts!
        </p>
        <div className="mt-6">
          <Link to="/blog">
            <button className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md transition-transform transform hover:scale-105">
              📖 Read Blogs
            </button>
          </Link>
        </div>
      </section>

      <div className="border border-gray-800"></div>
      <Contact />
    </>
  );
};

export default Home;
