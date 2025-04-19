import { useNotificationContext } from "../context/NotificationContext";
import { useState } from "react";

const NotificationDropdown = () => {
  const { notifications, markAsRead } = useNotificationContext();
  const [open, setOpen] = useState(false);

  const handleMarkedAsRead = async (id) => {
    try {
      await markAsRead(id);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <div className="relative">
      {/* Notification Icon Button */}
      <button onClick={() => setOpen(!open)} className="relative p-2">
        <div className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            {notifications.filter((n) => n.status === "unread").length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {notifications.filter((n) => n.status === "unread").length}
              </span>
            )}
          </div>
        </div>
      </button>

      {/* Notification Dropdown Panel */}
      {open && (
        <div className="absolute right-0 mt-2 sm:ml-5  sm:w-80 w-64 bg-gray-900 border border-gray-400 text-white shadow-lg rounded-lg overflow-hidden transition-all duration-200 animate-fade-in">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-400">Notifications</h3>
            
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-center text-gray-500 py-4">
                No new notifications
              </p>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif._id}
                  className={`p-3 border-b border-gray-700 flex justify-between items-center ${
                    notif.status === "unread" ? "bg-gray-800" : "bg-gray-900"
                  }`}
                >
                  <div>
                    <p className="text-sm">{notif.message}</p>
                    <small className="text-xs text-gray-400">
                      {new Date(notif.createdAt).toLocaleString()}
                    </small>
                  </div>
                  {notif.status === "unread" && (
                    <button
                      onClick={() => handleMarkedAsRead(notif._id)}
                      className="text-blue-400 text-sm btn btn-ghost hover:bg-gray-700"
                    >
                      Read
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
