import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { set } from "mongoose";
import { Navigate } from "react-router-dom";
import useScreenSize from "../hooks/Usescreensize";
import Goback from "../components/Goback";
import { SlOptions } from "react-icons/sl";

const UserProfile = () => {
  const { width } = useScreenSize();
  const { authUser, setAuthUser } = useAuthContext();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
  });
  const [OldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [opennew, setOpennew] = useState(false);
  const [done, setDone] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [verified, setVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    setUser(authUser || {});

    if (done) {
      setNewPassword("");
      setOldPassword("");
      setOpennew(false);
      setDone(false);
      setOtpSent(false);
    }
  }, [authUser]);

  // const {authuser:user} = useAuthContext();

  const handleChangePassword = async () => {
    const verifyold = async () => {
      try {
        // setOldPassword(OldPassword);
        if (!OldPassword) {
          toast.error("Please Enter Old Password");
        }
        console.log(OldPassword);
        const token = localStorage.getItem("token");
        const res = await axios.post(
          `${BASE_URL}/forget/verify-old`,
          { oldPassword: OldPassword, email: user.email },
          {
            headers: {
              "Content-Type": "application/json",

              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error(
          toast.error("Error updating profile:"),
          error.response?.data?.message || error.message
        );
        return false;
      }
    };

    if (await verifyold()) {
      console.log(newPassword);
      const res3 = await axios.post(
        `${BASE_URL}/forget/reset-password`,
        { newPassword, email: user.email },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      if (res3.status === 200) {
        setDone(true);
        toast.success("Password Updated");
      }
    }
  };

  const sendotp = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/forget/forget-password`,
        { email: user.email },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        toast.success("Otp Sent to Your Email");

        setOpennew(true);
        setOtpSent(true);
      }
    } catch (error) {
      console.error(
        toast.error("Error updating Password:"),
        error.response?.data?.message || error.message
      );
    }
  };

  const verifyotp = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/forget/verify-otp`,
        { otp: otp, email: user.email },
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
    }
  };

  const resetPassword = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/forget/reset-password`,
        { newPassword, email: user.email },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      setDone(true);
      setOpennew(false);
      setVerified(false);
      setNewPassword("");
      setOldPassword("");

      toast.success("Password Updated");
    } catch (error) {
      console.error(
        toast.error("Error updating Password:"),
        error.response?.data?.message || error.message
      );
    } finally {
      setOpennew(false);
      setVerified(false);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/info/profile`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        // setUser(response.data);
        setUpdatedUser({
          name: response.data.name,
          email: response.data.email,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  // Handle profile update
  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${BASE_URL}/api/info/update-User`,
        updatedUser,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update user in local storage and global state
      const updatedUserData = response.data;
      
      // Update local component state
      setUser(updatedUserData);
      
      // Update global context
      setAuthUser(updatedUserData);
      
      // Update localStorage
      localStorage.setItem("user", JSON.stringify(updatedUserData));
      
      setEditMode(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  //profile picture change
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleProfileClick = async (file) => {
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("profilePhoto", file);
    
    console.log("FormData content:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]); 
    }
   
    try {
      setLoading(true);
      const res = await axios.post(
        `${BASE_URL}/api/info/profile-update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      console.log("Server response:", res); 

      if (res.status === 200) {
        // Get the updated user data with new profile photo
        const updatedUser = res.data.user;
        
        // Update local component state
        setUser(updatedUser);
        
        // Update the global auth context so all components use the new image
        setAuthUser(updatedUser);
        
        // Update localStorage
        localStorage.setItem("user", JSON.stringify(updatedUser));
        
        // Clear the selected file
        setSelectedFile(null);
        
        toast.success("Profile Picture Updated");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      toast.error("Failed to update profile picture");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Page Container */}
      <div className="max-w-4xl mx-auto pt-24 pb-12 px-4 sm:px-6">
        {/* Profile Header */}
        <div className="relative mb-8">
          <div className="absolute -inset-1 bg-blue-500/20 rounded-xl blur-xl opacity-70"></div>
          <div className="relative flex items-center gap-4 bg-gray-800/60 p-6 rounded-xl border border-gray-700/60 backdrop-blur-sm shadow-xl">
            <Goback />
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-70"></div>
              <img
                src={user?.profilePhoto}
                className="relative w-16 h-16 rounded-full object-cover border-2 border-gray-900"
                alt=""
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                User Profile
              </h2>
              <p className="text-blue-300 text-sm">Manage your account settings</p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Photo Upload */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-xl h-full">
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
                Profile Picture
              </h3>
              
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4 group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img
                    src={user?.profilePhoto}
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-900 group-hover:border-blue-900 transition-all duration-300"
                    alt="Profile"
                  />
                </div>
                
                <p className="text-gray-400 text-sm mb-4 text-center">
                  Upload a new profile picture
                </p>
                
                <div className="w-full space-y-3">
                  <label className="block w-full px-4 py-2 border border-gray-700 bg-gray-800/60 rounded-lg text-center text-sm text-gray-300 hover:bg-gray-700/60 hover:text-white cursor-pointer transition-colors">
                    Select Image
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                  
                  {selectedFile && (
                    <button
                      onClick={() => handleProfileClick(selectedFile)}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm py-2 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-700/30"
                    >
                      {loading ? "Uploading..." : "Upload Image"}
                    </button>
                  )}
                </div>
              </div>
              
              <div className="border-t border-gray-700/50 pt-4 mt-2">
                <div className="text-sm text-gray-400">
                  <p className="mb-2">Account Type: <span className="text-blue-400 font-medium capitalize">{user?.role || "User"}</span></p>
                  <p>Member since: <span className="text-blue-400 font-medium">2023</span></p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Profile Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-xl mb-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
                  Personal Information
                </h3>
                
                {!editMode ? (
                  <button
                    onClick={() => setEditMode(true)}
                    className="bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 text-sm py-1.5 px-3 rounded-full transition-colors duration-300"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <button
                    onClick={() => setEditMode(false)}
                    className="bg-gray-700/50 hover:bg-gray-700/70 text-gray-300 text-sm py-1.5 px-3 rounded-full transition-colors duration-300"
                  >
                    Cancel
                  </button>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Name:</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="name"
                      value={updatedUser.name}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800/70 text-white p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent outline-none transition-all duration-300"
                    />
                  ) : (
                    <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                      {user?.name}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Email:</label>
                  {editMode ? (
                    <input
                      type="email"
                      name="email"
                      value={updatedUser.email}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800/70 text-white p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent outline-none transition-all duration-300"
                    />
                  ) : (
                    <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                      {user.email}
                    </div>
                  )}
                </div>
              </div>
              
              {editMode && (
                <div className="mt-6">
                  <button
                    onClick={handleUpdateProfile}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-700/30"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Updating Profile...
                      </span>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              )}
            </div>
            
            {/* Password Section */}
            <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-xl">
              <h3 className="text-lg font-semibold mb-6 bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
                Security
              </h3>
              
              {!opennew ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Current Password</label>
                    <input
                      type="password"
                      value={OldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full bg-gray-800/70 text-white p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent outline-none transition-all duration-300"
                      placeholder="Enter your current password"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-gray-800/70 text-white p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent outline-none transition-all duration-300"
                      placeholder="Enter new password"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0 pt-2">
                    <button
                      onClick={() => setOpennew(true)}
                      className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                    >
                      Forgot Password?
                    </button>

                    <button
                      onClick={handleChangePassword}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-700/30"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h4 className="font-medium text-white mb-2">
                    {!verified ? "Verify OTP" : "Reset Password"}
                  </h4>
                  
                  {!verified ? (
                    <>
                      <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-4 mb-4 text-sm text-blue-300">
                        An OTP will be sent to your email. The OTP is valid for 5 minutes.
                      </div>
                      
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full bg-gray-800/70 text-white p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent outline-none transition-all duration-300"
                        placeholder="Enter OTP"
                      />
                      
                      <div className="flex justify-between pt-2">
                        <button
                          onClick={() => setOpennew(false)}
                          className="bg-gray-700/50 hover:bg-gray-700/70 text-gray-300 text-sm py-2 px-4 rounded-lg transition-colors duration-300"
                        >
                          Back
                        </button>
                        
                        {!otpSent ? (
                          <button
                            onClick={sendotp}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-700/30"
                          >
                            Send OTP
                          </button>
                        ) : (
                          <button
                            onClick={verifyotp}
                            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-green-700/30"
                          >
                            Verify OTP
                          </button>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full bg-gray-800/70 text-white p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent outline-none transition-all duration-300"
                        placeholder="Enter New Password"
                      />
                      
                      <div className="flex justify-between pt-2">
                        <button
                          onClick={() => {
                            setVerified(false);
                            setOtpSent(false);
                          }}
                          className="bg-gray-700/50 hover:bg-gray-700/70 text-gray-300 text-sm py-2 px-4 rounded-lg transition-colors duration-300"
                        >
                          Back
                        </button>
                        
                        <button
                          onClick={resetPassword}
                          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-green-700/30"
                        >
                          Set New Password
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
