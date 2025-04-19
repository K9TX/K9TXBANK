import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UseRegister from "../hooks/UseRegister";

const Register = () => {
   
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loading, register } = UseRegister();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !name || !balance || !password) {
      setError("All fields are required!");
      return;
    }

    const result = await register(email, password, name, balance);
    if (result) {
      navigate("/dashboard");
    } else {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="bg-black border border-gray-600 mt-20 text-white p-8 rounded-lg shadow-lg m-5">
        <h1 className="text-3xl font-bold text-center mb-4">
          Create an Account
        </h1>
        <p className="text-gray-400 text-center mb-6">
          Join our secure banking platform and take control of your finances
          today.
        </p>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className=" text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Initial Balance
            </label>
            <input
              type="number"
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter initial balance (< 100000)"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <Link to="/login" className="text-blue-400 hover:underline">
              Already have an account?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full hover:cursor-pointer bg-blue-500 hover:bg-blue-600 transition duration-300 text-white py-2 rounded-lg font-semibold flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-ring loading-lg"></span>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
