import React from "react";
import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const UseLogin = () => {
  const Navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();

  function handleInputErrors(email, password) {
    if (!email || !password) {
      //react hot toasts.
      toast.error("Please Fill all the fields");
      return false;
    }
    return true; 
  }

  const login = async (email, password) => {
    try {
      const success = handleInputErrors(email, password);
      if (!success) return;
      setloading(true);
      // console.log(email, password);
      const res = await api.post("/api/auth/login", {email, password}, {
        withCredentials: true
      });

      console.log(res);
      const data = await res.data;
      console.log(data.token);
      if (data.error) {
        throw new Error("ERROR IN LOGIN AFTER FETCHING DATA", data.error);
      }

      
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.token);
      setAuthUser(data);
      if(authUser){

        toast.success("You have logged in successful!");
      }
      
      return true;

    } catch (error) {
      console.log(error.message);
      toast.error("Invalid Credentials", error.message);
    } finally {
      setloading(false);
    }
  };

 

  return { loading, authUser, login };
};

export default UseLogin;
