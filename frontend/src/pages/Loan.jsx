import React, { useState } from "react";

import axios from "axios";
import Goback from "../components/Goback.jsx";
import { useAuthContext } from "../context/AuthContext.jsx";

const Loan = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [interestRate, setInterestRate] = useState(8.5); // Now user can change this
  const [emi, setEmi] = useState(null);
  const { authUser: user } = useAuthContext();
  const [loanStatus, setLoanStatus] = useState("Pending");
  const [loading, setLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
  const calculateEMI = () => {
    if (!loanAmount || !duration) return;
    const P = parseFloat(loanAmount);
    const r = interestRate / 12 / 100; // Monthly interest rate
    const n = parseInt(duration) * 12; // Total months

    const EMI = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setEmi(EMI.toFixed(2));
  };

  const handleApplyLoan = async (e) => {
    e.preventDefault();
    setLoading(true);
    document.getElementById("loan_modal").showModal();

    setTimeout(() => {
      setLoading(false);
    }, 3000);

    const userId = user?.account?._id?.toString();
    if (!userId) return console.error("Invalid User ID");

    const token = localStorage.getItem("token");
    if (!token) return console.error("No token found");

    try {
      const response = await axios.post(
        `${BASE_URL}/api/loan/apply`,
        { amount: loanAmount, duration, interestRate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      
      console.log(response.data.loan.status);
      setLoanStatus(response.data.loan.status);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Background */}
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className=" p-6 bg-black border border-gray-800 mt-20 rounded-lg shadow-lg m-5">
          <div className="flex items-center mb-6 space-x-3">
            <Goback link="/loanoptions" />
            <img src="/second/loan.png" className="w-12" alt="Loan Icon" />
            <h2 className="text-white text-2xl font-semibold">
              Apply for Loan
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleApplyLoan} className="space-y-4">
            <label className="block text-gray-300 text-sm">Loan Amount</label>
            <input
              type="number"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-green-500"
              placeholder="Enter loan amount (e.g. 5000)"
              value={loanAmount}
              required
              onChange={(e) => setLoanAmount(e.target.value)}
            />

            <label className="block text-gray-300 text-sm">
              Duration (Years)
            </label>
            <input
              type="number"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-green-500"
              placeholder="Enter loan duration (e.g. 2)"
              value={duration}
              required
              onChange={(e) => setDuration(e.target.value)}
            />

            <label className="block text-gray-300 text-sm">
              Interest Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              min="1"
              max="20"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-green-500"
              placeholder="Enter interest rate (e.g. 8.5)"
              value={interestRate}
              required
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
            />

            {/* EMI Calculation */}
            <button
              type="button"
              onClick={calculateEMI}
              className="w-full bg-blue-600 hover:cursor-pointer hover:bg-blue-700 transition-all duration-200 text-white py-2 rounded-lg font-semibold"
            >
              Calculate EMI
            </button>

            {emi && (
              <div className="mt-2 text-center">
                <h3 className="text-lg font-semibold text-white">
                  Estimated EMI: ₹{emi}/month
                </h3>
                <p className="text-gray-400">Interest Rate: {interestRate}%</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:cursor-pointer hover:bg-green-700 transition-all duration-200 text-white py-2 rounded-lg font-semibold"
            >
              Apply for Loan
            </button>
          </form>
        </div>
      </div>

      {/* Modal */}
      <dialog id="loan_modal" className="modal">
        <div className="modal-box bg-black border h-96 justify-center border-blue-500 text-white text-center flex flex-col items-center">
          {loading ? (
            <span className="loading loading-ring loading-lg text-green-400"></span>
          ) : (
            <>
              <img
                src="/second/loan.png"
                className="w-16 animate-bounce"
                alt="Success"
              />
              <h3 className="text-xl font-semibold mt-2">{loanStatus}</h3>
              <p className="text-3xl font-bold mt-2">${loanAmount}.00</p>
              <p className="text-lg mt-2">Interest Rate: {interestRate}%</p>
            </>
          )}
          <div className="modal-action">
            <button
              className="btn btn-neutral"
              onClick={() => document.getElementById("loan_modal").close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Loan;
