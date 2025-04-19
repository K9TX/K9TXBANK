// Purpose: Allow admin to manage users & transactions.
// Features:
// View all registered users
// Update user roles (User, Manager, Admin)
// Delete users
// View all transactions in the system
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const { authUser: user } = useAuthContext();

  return (
    <div className="bg-black min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>
        
        {/* Admin Info */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg mb-8 border border-gray-800">
          <h2 className="text-xl text-white mb-4">Admin Information</h2>
          <div className="flex items-center space-x-4">
            <img 
              src={user?.profilePhoto || "/logo.png"} 
              alt="Admin" 
              className="w-16 h-16 rounded-full"
            />
            <div>
              <p className="text-white font-medium">{user?.name}</p>
              <p className="text-gray-400">{user?.email}</p>
              <p className="text-green-500">{user?.role}</p>
            </div>
          </div>
        </div>
        
        {/* Admin Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Management Card */}
          <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl text-white font-semibold mb-2">User Management</h3>
              <p className="text-gray-400 mb-4">Manage users, update roles, or delete accounts</p>
              <Link 
                to="/admin/users" 
                className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Manage Users
              </Link>
            </div>
          </div>
          
          {/* Loan Management Card */}
          <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl text-white font-semibold mb-2">Loan Management</h3>
              <p className="text-gray-400 mb-4">Review and approve pending loan applications</p>
              <Link 
                to="/admin/loans" 
                className="block w-full bg-green-600 text-white text-center py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200"
              >
                Manage Loans
              </Link>
            </div>
          </div>
          
          {/* Transaction History Card */}
          <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl text-white font-semibold mb-2">Transaction History</h3>
              <p className="text-gray-400 mb-4">View all transactions in the system</p>
              <Link 
                to="/transactions" 
                className="block w-full bg-purple-600 text-white text-center py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200"
              >
                View Transactions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard