import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Function to set authentication token
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
};

// Authentication APIs
export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// export const getProfile = async () => {
//   const response = await api.get("/users/profile");
//   return response.data;
// };

// Account APIs
export const getAccountDetails = async (userId) => {
  const response = await api.get(`/accounts/${userId}`);
  return response.data;
};

export const depositMoney = async (userId, amount) => {
  const response = await api.post(`/accounts/deposit/${userId}`, { amount });
  return response.data;
};

export const withdrawMoney = async (userId, amount) => {
  const response = await api.post(`/accounts/withdraw/${userId}`, { amount });
  return response.data;
};

export const transferMoney = async (data) => {
  const response = await api.post("/accounts/transfer", data);
  return response.data;
};

export default api;
