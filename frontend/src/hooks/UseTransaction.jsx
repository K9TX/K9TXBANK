import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";

const useTransaction = () => {
  const { authuser: user } = useAuthContext();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
  useEffect(() => {

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      setLoading(false);
      return;
    }

    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/transaction`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        if (!response?.data) {
          console.warn("No transactions found");
          setTransactions([]);
        } else {
          console.log("Fetched transactions:", response.data);
          setTransactions(response.data);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error?.response || error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user]); // Re-fetch when user changes

  return { transactions, loading, error };
};

export default useTransaction;
