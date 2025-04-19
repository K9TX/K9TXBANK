import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UseLogin from "../hooks/UseLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loading, login } = UseLogin();
  const navigate = useNavigate();
  const[process,setProcess] = useState(false);

  const handleLogin = async (e) => {
    setProcess(true);
    try {
      e.preventDefault();
      const result = await login(email, password);
      if (result) {
        navigate("/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.log(error)    
    }finally{
      setProcess(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black ">
      <div className="bg-black border border-gray-600 text-white p-8 rounded-lg shadow-lg w-auto m-5">
        <h1 className="text-3xl font-bold text-center mb-4">Login!</h1>
        <p className="text-gray-400 text-center mb-6">
          Sign in to continue managing your finances securely.
        </p>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
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
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <Link to="/register" className="text-blue-400 hover:underline">
              Don't have an account?
            </Link>
            <Link
              to="/forgot-password"
              className="text-gray-400 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 transition duration-300 text-white py-2 rounded-lg font-semibold flex justify-center items-center"
            disabled={loading}
          >
            {loading && process ? (
              <span className="loading loading-ring loading-lg"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
