import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Clipboard, ClipboardCheck } from "lucide-react";
import Goback from "../components/Goback";

const Users = () => {
  const [users, setUsers] = useState([]); 
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [copied, setCopied] = useState(null);
  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const tokens = localStorage.getItem("token");

        const response = await axios.get(`${BASE_URL}/api/info/getusers`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokens}`,
          },
          withCredentials: true,
        });
        setUsers(response.data);
        setFilteredUsers(response.data); // Initially, show all users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Handle copy account number
  const handleCopy = async (accountNumber) => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopied(accountNumber);
      setTimeout(() => setCopied(null), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  // Handle search input
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);

    const filtered = users.filter(
      (user) =>
        user?.name.toLowerCase().includes(value) ||
        user?.accountNumber.includes(value)
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <div className="container mx-auto mt-20 max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Goback />
          <img src="/second/user.png" className="w-8 h-8" alt="Users Icon" />
          <h2 className="text-2xl font-bold">Users</h2>
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name or account number..."
          className="w-full p-3 mb-4 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={handleSearch}
        />

        {/* Transfer Button */}
        <Link
          to="/transfer"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200 mb-4"
        >
          Transfer Money
        </Link>

        {/* Users Table */}
        <div className="overflow-y-auto max-h-[500px] border border-gray-700 rounded-lg">
          <table className="w-full text-white">
            <thead>
              <tr className="bg-gray-800 text-gray-300 text-left">
                <th className="p-3">User Name</th>
                <th className="p-3">Account Number</th>
                <th className="p-3">Role</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-4">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t border-gray-700 hover:bg-gray-800 transition duration-200"
                  >
                    <td className="p-3">{user.name}</td>
                    <td className="p-3 flex items-center space-x-3">
                      <button
                        onClick={() => handleCopy(user.accountNumber)}
                        className="text-gray-300 hover:text-blue-400 transition duration-200"
                      >
                        {copied === user.accountNumber ? (
                          <span className="flex items-center">
                            <ClipboardCheck className="w-5 h-5 text-green-400" />
                            <span className="text-green-400 text-sm">Copied</span>
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <Clipboard className="w-5 h-5" />
                            <span className="text-sm">Copy</span>
                          </span>
                        )}
                      </button>
                      <span>{user.accountNumber}</span>
                    </td>
                    <td className="p-3">{user.role}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
