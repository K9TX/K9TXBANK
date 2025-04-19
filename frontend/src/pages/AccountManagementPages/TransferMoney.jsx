import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import Goback from "../../components/Goback";
import { useSearchParams } from "react-router-dom";

const TransferMoney = () => {
  const [searchParams] = useSearchParams();
  const initialAccountNumber = searchParams.get("account" || "");
  const [receiverAccountNumber, setReceiverAccountNumber] = useState(initialAccountNumber);
  const [amount, setAmount] = useState("");
  const { authUser: user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!receiverAccountNumber || !amount) {
      setError("Please enter both account number and amount.");
      return;
    }

    setLoading(true);
    setError("");
    document.getElementById("transfer_modal").showModal();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/account/transfer`,
        { amount, receiverAccountNumber },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
      setError("Transaction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Background */}
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="sm:w-auto w-76 max-w-md p-6 bg-black border border-gray-800 rounded-lg shadow-lg">
          <div className="flex items-center mb-6 space-x-3">
            <Goback />
            <img src="/second/transfer3.png" className="w-12" alt="Transfer" />
            <h2 className="text-white text-2xl font-semibold">
              Transfer Money
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-gray-300 text-sm">
              Receiver's Account Number
            </label>
            <input
              type="text"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Enter receiver's account number"
              value={receiverAccountNumber}
              required
              onChange={(e) => setReceiverAccountNumber(e.target.value)}
            />
            
            <label className="block text-gray-300 text-sm">Amount</label>
            <input
              type="number"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Enter amount (e.g. 1000)"
              value={amount}
              required
              onChange={(e) => setAmount(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:cursor-pointer hover:bg-blue-700 transition-all duration-200 text-white py-2 rounded-lg font-semibold"
            >
              Send Money
            </button>

            {/* Find Users Link */}
            <Link
              to="/users"
              className="block btn  text-blue-400 p-2 "
            >
              Find Other Users
            </Link>
          </form>
        </div>
      </div>

      {/* Modal */}
      <dialog id="transfer_modal" className="modal">
        <div className="modal-box bg-black border h-96 justify-center border-blue-500 text-white text-center flex flex-col items-center">
          {loading ? (
            <span className="loading loading-ring loading-lg text-blue-400"></span>
          ) : error ? (
            <p className="text-red-500 font-semibold">{error}</p>
          ) : (
            <>
              <img
                src="/second/checkBalance.png"
                className="w-16 animate-bounce"
                alt="Success"
              />
              <h3 className="text-xl font-semibold mt-2">
                Transfer Successful
              </h3>
              <p className="text-3xl font-bold mt-2">${amount}.00</p>
              <p className="text-sm mt-1">
                Transferred to Account: {receiverAccountNumber}
              </p>
            </>
          )}
          <div className="modal-action">
            <button
              className="btn btn-neutral"
              onClick={() => document.getElementById("transfer_modal").close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default TransferMoney;
