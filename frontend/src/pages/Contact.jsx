import React, { useEffect } from "react";
import useScreenSize from "../hooks/Usescreensize";
import axios from "axios";
import { toast } from "react-hot-toast";

const Contact = () => {
  const width = useScreenSize();
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [done, setDone] = React.useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
  useEffect(() => {
    if (done) {
      setEmail("");
      setMessage("");
    }
  }, [done]);

  const contactUs = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/info/contact`,
        {
          email,
          message,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      if (res.status === 201) {
        setEmail("");
        setMessage("");
        toast.success(
          "Message Sent Successfully! We will get back to you soon."
        );
      }
    } catch (error) {
      console.error(
        toast.error("Error Sending Message! "),
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white px-4">
      <div className="w-full max-w-4xl mt-20 flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-12">
        {/* Left Side - Contact Info */}
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="sm:text-5xl text-3xl font-bold text-blue-400 animate-fadeIn">
            Contact Us
          </h1>
          <p className="mt-4 text-gray-400">
            Have any questions or feedback? Feel free to reach out, and our team
            will respond as soon as possible.
          </p>
          {width >= 768 && (<div className="mt-6 space-y-4 ">
            <p className="flex items-center space-x-3 text-gray-300">
              📧 <span className="font-medium">support@authbank.com</span>
            </p>
            <p className="flex items-center space-x-3 text-gray-300">
              📍{" "}
              <span className="font-medium">
                You can find us on Instagram, Twitter and Linkedin
              </span>
            </p>
            <p className="flex items-center space-x-3 text-gray-300">
              ☎ <span className="font-medium">+1 (800) 987-6543</span>
            </p>
          </div>)}
        </div>

        {/* Right Side - Contact Form */}
        <div className="w-full md:w-1/2 bg-black border-2 border-gray-800 bg-opacity-90 rounded-xl p-8 shadow-lg backdrop-blur-md">
          <h2 className="text-2xl font-semibold text-blue-300 text-center mb-4">
            Send a Message
          </h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-300 font-medium">
                Your Email
              </label>
              <input
                type="email"
                className="w-full p-3 mt-1 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 font-medium">
                Your Message
              </label>
              <textarea
                className="w-full p-3 mt-1 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500"
                rows="4"
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <button
              type="button"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md cursor-pointer     transition-transform transform hover:scale-105"
              onClick={contactUs}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
