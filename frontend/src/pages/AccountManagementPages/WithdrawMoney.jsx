import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";
import Goback from "../../components/Goback";

const WithdrawMoney = () => {
  const [amount, setAmount] = useState("");
  const { authUser: user } = useAuthContext();
  const [accountNumber] = useState(user?.account?.accountNumber);
  const [loading, setLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    document.getElementById("withdraw_modal").showModal();

    setTimeout(() => {
      setLoading(false);
    }, 3000);

    const userId = user?.account?._id?.toString();
    if (!userId) return console.error("Invalid User ID");

    const token = localStorage.getItem("token");
    if (!token) return console.error("No token found");

    try {
      const response = await axios.post(
        `${BASE_URL}/api/account/withdraw/`,
        { amount, accountNumber },
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
    }
  };

  return (
    <>
      {/* Background */}
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="sm:w-auto w-76 max-w-md p-6 bg-black border border-gray-800 rounded-lg shadow-lg">
          <div className="flex items-center mb-6 space-x-3">
            <Goback />
            <img
              src="/second/withdraw.png"
              className="w-12"
              alt="Withdraw Icon"
            />
            <h2 className="text-white text-2xl font-semibold">
              Withdraw Money
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-gray-300 text-sm">
              Your Account Number
            </label>
            <input
              type="text"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-red-500"
              value={accountNumber}
              readOnly
            />

            <label className="block text-gray-300 text-sm">Amount</label>
            <input
              type="number"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-red-500"
              placeholder="Enter amount (e.g. 1000)"
              value={amount}
              required
              onChange={(e) => setAmount(e.target.value)}
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-600 hover:cursor-pointer hover:bg-red-700 transition-all duration-200 text-white py-2 rounded-lg font-semibold"
            >
              Withdraw Money
            </button>
          </form>
        </div>
      </div>

      {/* Modal */}
      <dialog id="withdraw_modal" className="modal">
        <div className="modal-box bg-black border h-96 justify-center border-red-500 text-white text-center flex flex-col items-center">
          {loading ? (
            <span className="loading loading-ring loading-lg text-red-400"></span>
          ) : (
            <>
              <img
                src="/second/checkBalance.png"
                className="w-16 animate-bounce"
                alt="Success"
              />
              <h3 className="text-xl font-semibold mt-2">
                Withdrawal Successful
              </h3>
              <p className="text-3xl font-bold mt-2">-${amount}.00</p>
            </>
          )}
          <div className="modal-action">
            <button
              className="btn btn-neutral"
              onClick={() => document.getElementById("withdraw_modal").close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default WithdrawMoney;
