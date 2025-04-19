import React, { useState } from "react";
import Mainfile from "../components/DashboardComponents/Mainfile.jsx";
import Card from "../components/DashboardComponents/Card.jsx";
import useTransaction from "../hooks/UseTransaction.jsx";
import useScreenSize from "../hooks/Usescreensize.jsx";
import { Link } from "react-router-dom";
import { FaSearch } from 'react-icons/fa';

const Dashboard = () => {
  const { fetchTransactions } = useTransaction();
  const { width } = useScreenSize();

  // State for search input
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTransaction = async () => {
    try {
      await fetchTransactions();
    } catch (error) {
      console.error("Error fetching transactions in dashboard:", error);
    }
  };

  // List of dashboard cards
  const dashboardCards = [
    {
      link: "/transfer",
      title: "Transfer Money",
      photo: "/second/transfer3.png",
      description: "Transfer money to another account.",
      buttonname: "Transfer",
    },
    {
      link: "/history",
      title: "Transaction History",
      photo: "/second/history.png",
      description: "View your transaction history.",
      buttonname: "History",
      onClick: fetchTransaction,
    },
    {
      link: "/deposit",
      title: "Deposit Money",
      photo: "/second/deposit.png",
      description: "Deposit money into your account.",
      buttonname: "Deposit",
    },
    {
      link: "/withdraw",
      title: "Withdraw Money",
      photo: "/second/withdraw.png",
      description: "Withdraw money from your account.",
      buttonname: "Withdraw",
    },
    {
      link: "/checkBalance",
      title: "Check Balance",
      photo: "/second/checkBalance.png",
      description: "Check your account balance with security.",
      buttonname: "Check Balance",
    },
    {
      link: "/loanoptions",
      title: "Loan",
      photo: "/second/loan.png",
      description: "Apply for a Secure Loan.",
      buttonname: "loan",
    },
    {
      link: "/users",
      title: "Other Users",
      photo: "/second/user.png",
      description: "Find other users.",
      buttonname: "Users",
      onClick: fetchTransaction,
    },
  ];

  // Filter cards based on search input
  const filteredCards = dashboardCards.filter((card) =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/bank.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-75 z-10"></div>
      
      {/* Content Container */}
      <div className="relative z-20 p-6 min-h-screen">
        <Mainfile />

        {/* Search Input Field */}
        <div className="flex justify-center my-8">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pl-12 bg-gray-800/70 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
            />
            <FaSearch className="absolute top-3.5 left-4 text-gray-400" />
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="py-4 px-2">
          {filteredCards.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
              {filteredCards.map((card, index) => (
                <Card key={index} {...card} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl text-center border border-gray-700">
              <p className="text-gray-300 text-lg">
                No results found. Try searching for "Deposit", "Withdraw", "Transfer", "Balance", "History", or "Users"
              </p>
            </div>
          )}
        </div>

        {/* Blog Section */}
        <section className="mt-12 bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 text-center text-gray-300 shadow-lg">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              📢 Explore Our Blog
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Stay updated with the latest financial trends, investment tips,
              and banking insights. Read blogs from experts and share your thoughts!
            </p>
            <Link to="/blog">
              <button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-8 rounded-full text-lg shadow-xl transition-all duration-300 hover:shadow-blue-500/30 hover:scale-105">
                📖 Read Blogs
              </button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
