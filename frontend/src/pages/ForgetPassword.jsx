import React,{useState} from 'react'
import axios from "axios"
import toast from "react-hot-toast"
import { useEffect } from 'react'
const ForgetPassword = () => {
    const [email,setEmail] = React.useState("");
    const [otp,setOtp] = React.useState("");
    const[loading,setLoading] = React.useState(false);
    const[otpSent,setOtpSent] = useState(false);
    const[opennew,setOpennew ] = useState(false);
    const[verified,setVerified] = useState(false);
    const[ newPassword,setNewPassword] = useState("");
    const [done,setDone] = useState(false)
    const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
    useEffect(()=>{
        if(done){
            toast.success("Password Changed Successfully.")
            setOpennew(false);
            setVerified(false);
            setNewPassword("");
        }
    },[])

    const sendotp = async () => {
      try {
        setLoading(true);
        const res = await axios.post(
          `${BASE_URL}/forget/forget-password`,
          { email: email },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true,
          }
        );

        
          toast.success("Otp Sent to Your Email");

          setOpennew(true);
          setOtpSent(true);
          setVerified(false);
        
      } catch (error) {
        console.error(
          toast.error("Error updating Password:"),
          error.response?.data?.message || error.message
        );
      }
      finally{
        setLoading(false);
      }
    };

    const verifyotp = async () => {
        setLoading(true);
      try {
        const res = await axios.post(
          `${BASE_URL}/forget/verify-otp`,
          { otp: otp, email: email },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          setVerified(true);
          setOtpSent(false);
          toast.success("Otp Verified");
        }
      } catch (error) {
        console.error(
          toast.error("Error updating Password:"),
          error.response?.data?.message || error.message
        );
      }finally{
        setLoading(false);
      }


    };


    const resetPassword = async () => {
      try {
        setLoading(true)
        const res = await axios.post(
          `${BASE_URL}/forget/reset-password`,
          { newPassword, email },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true,
          }
        );

       
        

            toast.success("Password Updated");
            
                setTimeout(() => {
                  setDone(true);
                }, 2000);
                
            
            
        
         
        
      } catch (error) {
        console.error(
          toast.error("Error updating Password:"),
          error.response?.data?.message || error.message
        );
      } finally {
        setLoading(false);
      }
    };
  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="bg-black border border-gray-600 text-white p-8 rounded-lg shadow-lg w-auto m-5">
        <h1 className="text-3xl font-bold text-center mb-4 sm:w-80">
          Forget Password!
        </h1>
        {(<p className="text-gray-400 text-center mb-6">Enter Email to get OTP</p>)}
        <form className="space-y-4">
          {!opennew && !verified ? (
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
          ) : !verified && opennew ? (
            <div>
              <label className="block text-sm font-medium mb-1">OTP</label>
              <input
                type="OTP"
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
          ) : verified && (
            <div>
              <label className="block text-sm font-medium mb-1">New Password</label>
              <input
                type="Password"
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
          )}

          {!opennew && !verified ? (
            <button
              type="submit"
              className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 transition duration-300 text-white py-2 rounded-lg font-semibold flex justify-center items-center"
              disabled={loading}
              onClick={sendotp}
            >
              {loading ? (
                <span className="loading loading-ring loading-lg"></span>
              ) : (
                "Send OTP"
              )}
            </button>
          ) : !verified ? (
            <button
              type="submit"
              className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 transition duration-300 text-white py-2 rounded-lg font-semibold flex justify-center items-center"
              disabled={loading}
              onClick={verifyotp}
            >
              {loading ? (
                <span className="loading loading-ring loading-lg"></span>
              ) : (
                "Verify OTP"
              )}
            </button>
          ) : verified && (
            <button
              type="resetPassword"
              className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 transition duration-300 text-white py-2 rounded-lg font-semibold flex justify-center items-center"
              
              onClick={resetPassword}
            >
              {loading ? (
                <span className="loading loading-ring loading-lg"></span>
              ) : (
                "Submit"
              )}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword