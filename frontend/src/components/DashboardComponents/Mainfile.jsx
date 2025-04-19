import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useScreenSize from "../../hooks/Usescreensize";
import { Link } from "react-router-dom";
import QRCodeComponent from "../QRCode/QRCodeComponent";
import { FaUserAlt, FaEnvelope, FaCreditCard } from 'react-icons/fa';

const Mainfile = () => {
  const { authUser: user } = useAuthContext();
  const { width } = useScreenSize();

  return (
    <div className="flex justify-center mt-8">
      <div className="relative w-full max-w-lg">
        {/* Background effects */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20"></div>
        
        <div className="relative bg-gradient-to-br from-gray-900 to-black text-white border border-gray-800/50 shadow-2xl p-6 rounded-xl backdrop-blur-sm overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-blue-500/10 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-40 w-40 rounded-full bg-purple-500/10 blur-2xl"></div>
          
          {/* Profile area */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Profile Picture */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm opacity-75"></div>
              <img
                src={user?.profilePhoto || "/logo.png"}
                alt="Profile"
                draggable="false"
                className="relative w-24 h-24 rounded-full object-cover border-2 border-gray-800 shadow-lg z-10"
              />
            </div>
            
            {/* User Details */}
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {user?.name.toUpperCase()}
              </h2>
              <div className="flex items-center justify-center sm:justify-start mt-1 text-gray-400">
                <FaUserAlt className="mr-1" size={12} />
                <p className="text-sm">{user?.role}</p>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center bg-gray-800/50 p-3 rounded-lg">
              <FaCreditCard className="text-blue-400 mr-3" />
              <div>
                <p className="text-xs text-gray-400">Account Number</p>
                <p className="font-mono font-medium text-blue-300">
                  {user?.account?.accountNumber}
                </p>
              </div>
            </div>
            
            <div className="flex items-center bg-gray-800/50 p-3 rounded-lg">
              <FaEnvelope className="text-blue-400 mr-3" />
              <div>
                <p className="text-xs text-gray-400">Email</p>
                <p className="font-medium text-blue-300">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* QR Code with styling */}
          <div className="mt-6 bg-gray-800/30 p-4 rounded-lg border border-gray-700/50">
            <QRCodeComponent accountNumber={user?.account?.accountNumber} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainfile;
