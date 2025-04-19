import React from "react";
import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
const API_BASE_URL = `${BASE_URL}/api`;

import axios from "axios";

const api = axios.create({
  baseURL: API_BASE_URL ,
  headers: { "Content-Type": "application/json" },
});

const UseRegister = () => {
  const [loading, setloading] = useState(false);
  const { setAuthUser } = useAuthContext();

  function handleInputErrors(email, password, name, balance) {
    if (!email || !password || !name || !balance || balance>=100000) {
      //react hot toasts.
      if(balance>=100000){

          toast.error("Maximum Initial Balance should be less than 100000");
      }
      toast.error("Please Fill all the fields");
      return false;
    }
    return true;
  }

  const register = async (email, password,name,balance=0) => {
    setloading(true);
    try {
      const success = handleInputErrors(email, password,name,balance);
      if (!success) return;
      // console.log(email, password);
      const res = await api.post(
        "/auth/register",
        { email, password,name,balance },
        {
          withCredentials: true,
        }
      );

      // console.log(res);
      const data = await res.data;
      console.log(data);
      if (data.error) {
        throw new Error("ERROR IN register AFTER FETCHING DATA", data.error);
      }

      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.token);
      setAuthUser(data);
      toast.success("You have registered successful!");

      return true;
    } catch (error) {
      console.log(error.message);
      toast.error("error in Register", error.message);
    } finally {
      setloading(false);
    }
  };
  return { loading, register };
};

export default UseRegister;
