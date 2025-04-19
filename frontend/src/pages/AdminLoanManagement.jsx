import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import Goback from "../components/Goback";
import { Link } from "react-router-dom";

const AdminLoanManagement = () => {
  const { authUser: user } = useAuthContext();
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLoans, setFilteredLoans] = useState([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchAllLoans = async () => {
      if (!user?._id || user.role !== "admin") {
        setLoading(false);
        setError("Only admins can access this page");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        // Use the /all endpoint which is admin-only
        const response = await axios.get(`${BASE_URL}/api/loan/all`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        if (!response.data || response.data.length === 0) {
          setLoans([]);
          setFilteredLoans([]);
          setError("No loan applications in the system");
          return;
        }

        const formattedLoans = response.data.map((loan) => ({
          _id: loan._id,
          amount: loan.amount,
          duration: loan.duration,
          status: loan.status,
          interestRate: loan.interestRate || 8.5,
          userName: loan.user?.name || "Unknown User",
          userEmail: loan.user?.email || "Unknown Email",
          userId: loan.user?._id || "Unknown ID",
          createdAt: new Date(loan?.createdAt).toLocaleDateString(),
        })).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setLoans(formattedLoans);
        setFilteredLoans(formattedLoans);
      } catch (err) {
        console.error("Error fetching loans:", err);
        setError(err.response?.data?.message || "Failed to fetch loans");
      } finally {
        setLoading(false);
      }
    };

    fetchAllLoans();
  }, [user]);

  useEffect(() => {
    // Filter loans based on search term
    const filtered = loans.filter(
      (loan) =>
        loan.amount.toString().includes(searchTerm) ||
        loan.duration.toString().includes(searchTerm) ||
        loan.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.interestRate.toString().includes(searchTerm)
    );
    setFilteredLoans(filtered);
  }, [searchTerm, loans]);

  const handleReviewLoan = async (loanId, status) => {
    if (!confirm(`Are you sure you want to ${status} this loan?`)) {
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.post(
        `${BASE_URL}/api/loan/review`,
        { loanId, status },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      // Update the local state after successful review
      setLoans((prevLoans) =>
        prevLoans.map((loan) =>
          loan._id === loanId ? { ...loan, status } : loan
        )
      );

      alert(`Loan ${status} successfully`);
    } catch (err) {
      console.error("Error reviewing loan:", err);
      alert(err.response?.data?.message || `Failed to ${status} loan`);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    return {
      pending: "text-yellow-500",
      approved: "text-green-500",
      rejected: "text-red-500",
    }[status] || "text-gray-400";
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center py-6">
      <div className="w-full max-w-6xl m-5 mt-20 p-6 bg-black border border-gray-800 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex items-center mb-6 space-x-3">
          <Goback link="/admin" />
          <img
            src="/second/loanStatus.png"
            className="w-12"
            alt="Loan Management Icon"
          />
          <h2 className="text-white text-2xl font-semibold">
            Admin Loan Management
          </h2>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-green-500 mb-4"
          placeholder="Search by amount, duration, status, or user..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Loading State */}
        {loading ? (
          <div className="text-white text-center">
            <span className="loading loading-ring loading-lg text-green-400"></span>
            <p className="mt-2">Fetching loan applications...</p>
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : filteredLoans.length > 0 ? (
          <div className="space-y-4">
            {filteredLoans.map((loan) => (
              <div
                key={loan._id}
                className="p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-md"
              >
                <div className="flex flex-wrap justify-between">
                  <div className="w-full md:w-1/2">
                    <p className="text-white">
                      <span className="font-semibold">User:</span>{" "}
                      {loan.userName} ({loan.userEmail})
                    </p>
                    <p className="text-white">
                      <span className="font-semibold">Loan Amount:</span> $
                      {loan.amount}
                    </p>
                    <p className="text-white">
                      <span className="font-semibold">Duration:</span>{" "}
                      {loan.duration} years
                    </p>
                    <p className="text-white">
                      <span className="font-semibold">Interest Rate:</span>{" "}
                      {loan.interestRate}%
                    </p>
                  </div>
                  <div className="w-full md:w-1/2 mt-3 md:mt-0">
                    <p
                      className={`font-semibold ${getStatusColor(
                        loan.status
                      )}`}
                    >
                      Loan Status: {loan.status}
                    </p>
                    <p className="text-white">
                      <span className="font-semibold">Date:</span>{" "}
                      {loan.createdAt}
                    </p>

                    {/* Action Buttons */}
                    {loan.status === "pending" && (
                      <div className="flex space-x-2 mt-2">
                        <button
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          onClick={() => handleReviewLoan(loan._id, "approved")}
                          disabled={loading}
                        >
                          Approve
                        </button>
                        <button
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          onClick={() => handleReviewLoan(loan._id, "rejected")}
                          disabled={loading}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center">
            No matching loan applications found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminLoanManagement;