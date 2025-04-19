import React from "react";
import { Link } from "react-router-dom";

const Card = ({ title, photo, description, buttonname, link = "" }) => {
  return (
    <Link to={link} className="group w-full max-w-xs">
      <div className="relative h-80 w-full bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-5 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-blue-500/10 group-hover:border-gray-600/50 overflow-hidden">
        {/* Glassmorphism effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Image */}
        <div className="relative flex justify-center mb-5">
          <div className="h-28 w-28 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center p-1">
            <img
              className="h-24 w-24 object-cover rounded-full transition-all duration-500 group-hover:scale-110 z-10"
              src={photo}
              alt={title}
            />
          </div>
        </div>

        {/* Card Content */}
        <div className="relative text-center z-10">
          <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{title}</h2>
          <p className="text-gray-400 text-sm mt-2 mb-4">{description}</p>
        </div>

        {/* Button */}
        {buttonname && (
          <div className="relative flex justify-center mt-5 z-10">
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105">
              {buttonname}
            </button>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Card;
