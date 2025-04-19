import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useAuthContext } from "./AuthContext";
import {io} from "socket.io-client"

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
const API_BASE_URL = `${BASE_URL}/api`;



const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true
});

const NotificationContext = createContext();

export const useNotificationContext = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const { authUser } = useAuthContext();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if(!authUser || !authUser._id) return
    if (authUser) {
      fetchNotifications();

      //socketio
      // Initialize socket connection
      const newSocket = io(`${BASE_URL}`, {
        transports: ["websocket"],
        reconnection: true, // Auto-reconnect if disconnected
        reconnectionAttempts: 5,
        reconnectionDelay: 2000,
        forceNew: true,
      });
      newSocket.emit("joinroom", authUser._id);
      
      newSocket.on("joinRoom", (userId) => {
        if (userId) {
          socket.join(userId);
          console.log(`User ${userId} joined room ${userId}`);
        } else {
          console.log("User ID is missing for joinRoom event");
        }
      });

     setSocket(newSocket)

      newSocket.on("connect", () => {
        console.log("connected to webSocket:", newSocket.id);
      });

      newSocket.on("newNotification", (newNotification) => {
        console.log("Received new notification:", newNotification);
        setNotifications((prev) => [newNotification, ...prev]);
      });

      newSocket.on("disconnect", () => {
        console.log("disconnected from webSocket");
      });
      
      return () => {
        if (newSocket) {
          newSocket.disconnect();
        }
      };
    }
  }, [authUser?.id]);

  // Fetch notifications from backend
  const fetchNotifications = async () => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      const { data } = await api.get("/notifications", {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token in headers
        },
        withCredentials: true,
      });
      console.log("notifications:",data)
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications", error);
    }
  };

  // Mark notification as read
  const markAsRead = async (id) => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    
    if (!token) {
      console.error("No token found");
      return;
    }
    try {
        const noti = id;
      await api.put(
        `/notifications/${noti}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in headers
            "Content-Type": "application/json",
          },
          withCredentials: true 
        },
      );
      setNotifications(
        notifications.map((notif) =>
          notif._id === id ? { ...notif, status: "read" } : notif
        )
      );
    } catch (error) {
      console.error("Error marking notification as read", error);
    }
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, fetchNotifications, markAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;