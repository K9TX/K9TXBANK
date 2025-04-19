import React, { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
import Goback from "../components/Goback";

const LoanStatus = () => {
  const { authUser: user } = useAuthContext();
  const [loanDetails, setLoanDetails] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
  useEffect(() => {
    const fetchLoanStatus = async () => {
      if (!user?._id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/loan/loan-status`, {
          headers: { "Content-Type": "application/json",Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        if (!response.data || response.data.length === 0) {
          setLoanDetails([]);
          setFilteredLoans([]);
          setError("You have no loan applications yet.");
        } else {
          const filteredLoans = response.data
            .map((loan) => ({
              _id: loan?._id,
              amount: loan?.amount,
              duration: loan?.duration,
              status: loan?.status,
              approvedBy: loan?.approvedBy,
              interestRate: loan?.interestRate || 8.5,
              createdAt: new Date(loan?.createdAt).toLocaleDateString(),
            })).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

          setLoanDetails(filteredLoans);
          setFilteredLoans(filteredLoans);
          setError(null);
        }
      } catch (error) {
        console.error("Error fetching loan status:", error);
        setError(
          error.response?.data?.message || "Failed to fetch loan status."
        );
        setLoanDetails([]);
        setFilteredLoans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLoanStatus();
  }, [user]);

  const getStatusColor = (status) => {
    return (
      {
        "Under Review": "text-yellow-500",
        Approved: "text-green-500",
        Rejected: "text-red-500",
      }[status] || "text-gray-400"
    );
  };

  // Search function
  useEffect(() => {
    const filtered = loanDetails.filter(
      (loan) =>
        loan.amount.toString().includes(searchTerm) ||
        loan.duration.toString().includes(searchTerm) ||
        loan.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.interestRate.toString().includes(searchTerm)
    );
    setFilteredLoans(filtered);
  }, [searchTerm, loanDetails]);

  return (
    <div className="bg-black min-h-screen flex flex-col items-center py-6">
      <div className="sm:w-full w-80 max-w-2xl m-5 mt-20 p-6 bg-black border border-gray-800 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex items-center mb-6 space-x-3">
          <Goback link="/loanoptions" />
          <img
            src="/second/loanStatus.png"
            className="w-12"
            alt="Loan Status Icon"
          />
          <h2 className="text-white text-2xl font-semibold">Loan Status</h2>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-green-500 mb-4"
          placeholder="Search by amount, duration, or status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Loading State */}
        {loading ? (
          <div className="text-white text-center">
            <span className="loading loading-ring loading-lg text-green-400"></span>
            <p className="mt-2">Fetching loan status...</p>
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
                <p className="text-white">
                  <span className="font-semibold">Approved By:</span>{" "}
                  {loan.approvedBy ? loan.approvedBy : "Not Approved"}
                </p>
                <p
                  className={`font-semibold ${getStatusColor(
                    loan.status
                  )} mt-2`}
                >
                  Loan Status: {loan.status}
                </p>
                <p className="text-white">
                  <span className="font-semibold">Date:</span> {loan.createdAt}
                </p>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="w-full bg-gray-700 h-2 rounded-full">
                    <div
                      className={`h-2 rounded-full ${
                        loan.status === "pending"
                          ? "bg-yellow-500 w-1/3"
                          : loan.status === "approved"
                          ? "bg-green-500 w-full"
                          : loan.status === "rejected"
                          ? "bg-red-500 w-full"
                          : "bg-gray-400 w-1/3"
                      }`}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Pending</span>
                    <span>Under Review</span>
                    <span>
                      {loan.status === "approved" ? "Approved" : loan.status === "rejected" ? "Rejected" : "Pending" }
                    </span>
                    
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

export default LoanStatus;
