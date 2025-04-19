import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { useState, useEffect } from "react";
import moment from "moment";
import UseTransaction from "../../hooks/UseTransaction";
import { useAuthContext } from "../../context/AuthContext";
import useScreenSize from "../../hooks/Usescreensize";
import Goback from "../../components/Goback";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const { authuser: user } = useAuthContext();
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filters, setFilters] = useState({ type: "", status: "", date: "" });
  const { transactions: transactionsData, loading, error } = UseTransaction();
  const { width } = useScreenSize(); // Get screen width for responsiveness
  
  useEffect(() => {
    if (transactionsData) {
      const formattedTransactions = transactionsData.map((txn) => ({
        _id: txn?._id,
        type: txn?.type || "unknown",
        amount: txn?.amount,
        status: txn?.status,
        date: moment(txn?.createdAt).format("DD-MM-YYYY hh:mm A") || "N/A",
        receiver: txn?.receiver?.user?.name,
        sender: txn?.sender?.user?.name,
        receiverAC: txn?.receiver?.user?.email,
        senderAC: txn?.sender?.user?.email,
      }));
      setFilteredTransactions(formattedTransactions);
      setTransactions(formattedTransactions);
    }
  }, [transactionsData]);

  useEffect(() => {
    let filtered = transactions;
    if (filters.type)
      filtered = filtered.filter((t) => t.type === filters.type);
    if (filters.status)
      filtered = filtered.filter((t) => t.status === filters.status);
    if (filters.date) {
      filtered = filtered.filter(
        (t) =>
          moment(t.date, "DD-MM-YYYY").format("YYYY-MM-DD") === filters.date
      );
    }
    setFilteredTransactions(filtered);
  }, [filters, transactions]);

  const totalInflow = transactions
    .filter((t) => t.type === "deposit")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalOutflow = transactions
    .filter((t) => t.type !== "deposit")
    .reduce((sum, t) => sum + t.amount, 0);
  const highestTransaction = transactions.length
    ? Math.max(...transactions.map((t) => t.amount))
    : 0;

  const exportCSV = () => {
    const ws = XLSX.utils.json_to_sheet(filteredTransactions);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transactions");
    XLSX.writeFile(wb, "transactions.xlsx");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
      <div className="max-w-7xl mx-auto mt-20">
        {/* Header with subtle glow */}
        <div className="relative mb-8">
          <div className="absolute -inset-1 bg-blue-500/20 rounded-xl blur-xl opacity-70"></div>
          <div className="relative flex items-center gap-3 bg-gray-800/80 p-4 rounded-xl border border-gray-700/60 backdrop-blur-sm">
            <Goback />
            <div className="bg-gradient-to-br from-blue-600/30 to-blue-900/30 p-3 rounded-lg border border-blue-500/30 shadow-lg shadow-blue-500/10">
              <img src="/second/history.png" className="w-12 h-12 filter drop-shadow-lg" alt="History" />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Transaction History
              </h2>
              <p className="text-blue-300 text-sm">View and manage your financial activities</p>
            </div>
          </div>
        </div>

        {/* Filters Section with glassmorphism */}
        <div className="bg-gray-800/30 backdrop-blur-md p-5 rounded-xl border border-gray-700/50 shadow-lg mb-8">
          <h3 className="text-lg font-semibold text-blue-300 mb-4">Filter Transactions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="relative">
              <select
                className="w-full bg-gray-900/80 text-white border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 rounded-lg px-4 py-2.5 appearance-none transition-all"
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              >
                <option value="">All Types</option>
                <option value="deposit">Deposit</option>
                <option value="withdraw">Withdraw</option>
                <option value="transfer">Transfer</option>
                <option value="loan">Loan</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>

            <div className="relative">
              <select
                className="w-full bg-gray-900/80 text-white border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 rounded-lg px-4 py-2.5 appearance-none transition-all"
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="">All Status</option>
                <option value="success">Success</option>
                <option value="failed">Failed</option>
                <option value="pending">Pending</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>

            <div className="relative">
              <input
                type="date"
                className="w-full bg-gray-900/80 text-white border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 rounded-lg px-4 py-2.5 transition-all"
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              />
            </div>

            <button
              onClick={exportCSV}
              className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-2.5 rounded-lg shadow-lg hover:shadow-blue-600/30 transition-all duration-300 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              Download Excel
            </button>
          </div>
        </div>

        {/* Summary Cards with gradients and glow */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="relative overflow-hidden group">
            <div className="absolute -inset-1 bg-blue-500/20 rounded-xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-gradient-to-br from-blue-900/50 to-blue-700/20 p-6 border border-blue-700/50 rounded-xl backdrop-blur-sm shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
              <div className="absolute right-0 top-0 -mt-6 -mr-6 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
              <h3 className="text-lg text-blue-300 font-medium mb-1">Total Inflow 💰</h3>
              <p className="text-3xl font-bold text-white">${totalInflow.toLocaleString()}</p>
              <div className="mt-4 h-1 w-full bg-blue-700/30 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(totalInflow / (totalInflow + totalOutflow)) * 100}%` }}></div>
              </div>
            </div>
          </div>
          
          <div className="relative overflow-hidden group">
            <div className="absolute -inset-1 bg-purple-500/20 rounded-xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-gradient-to-br from-purple-900/50 to-purple-700/20 p-6 border border-purple-700/50 rounded-xl backdrop-blur-sm shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
              <div className="absolute right-0 top-0 -mt-6 -mr-6 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"></div>
              <h3 className="text-lg text-purple-300 font-medium mb-1">Total Outflow 💸</h3>
              <p className="text-3xl font-bold text-white">${totalOutflow.toLocaleString()}</p>
              <div className="mt-4 h-1 w-full bg-purple-700/30 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: `${(totalOutflow / (totalInflow + totalOutflow)) * 100}%` }}></div>
              </div>
            </div>
          </div>
          
          <div className="relative overflow-hidden group">
            <div className="absolute -inset-1 bg-emerald-500/20 rounded-xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-gradient-to-br from-emerald-900/50 to-emerald-700/20 p-6 border border-emerald-700/50 rounded-xl backdrop-blur-sm shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
              <div className="absolute right-0 top-0 -mt-6 -mr-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl"></div>
              <h3 className="text-lg text-emerald-300 font-medium mb-1">Highest Transaction ⚡</h3>
              <p className="text-3xl font-bold text-white">${highestTransaction.toLocaleString()}</p>
              <div className="mt-4 h-1 w-full bg-emerald-700/30 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(highestTransaction / (totalInflow + totalOutflow)) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Table with subtle hover effects */}
        {width > 768 ? (
          <div className="relative overflow-hidden rounded-xl shadow-2xl">
            <div className="absolute -inset-1 bg-blue-500/10 rounded-xl blur-md opacity-70"></div>
            <div className="relative overflow-x-auto border border-gray-700/60 rounded-xl bg-gray-800/50 backdrop-blur-md">
              <table className="w-full text-white table-auto">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Sender</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Receiver</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {filteredTransactions.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-8 px-4 text-gray-400 italic bg-black/20">
                        No Transactions Found
                      </td>
                    </tr>
                  ) : (
                    filteredTransactions.map((txn) => (
                      <tr key={txn._id} className="hover:bg-blue-900/10 transition-colors duration-150">
                        <td className="px-4 py-3 text-sm">{txn._id.slice(0, 6)}...</td>
                        <td className="px-4 py-3">
                          <span className="text-lg font-semibold">${txn.amount}</span>
                        </td>
                        <td className="px-4 py-3 text-sm">{txn.sender}</td>
                        <td className="px-4 py-3 text-sm">{txn.receiver}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            txn.type === "deposit" 
                              ? "bg-blue-900/30 text-blue-400 border border-blue-800/50" 
                              : txn.type === "withdraw"
                                ? "bg-purple-900/30 text-purple-400 border border-purple-800/50"
                                : txn.type === "transfer"
                                  ? "bg-teal-900/30 text-teal-400 border border-teal-800/50"
                                  : "bg-amber-900/30 text-amber-400 border border-amber-800/50"
                          }`}>
                            {txn.type}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            txn.status === "success"
                              ? "bg-green-900/30 text-green-400 border border-green-800/50"
                              : txn.status === "failed"
                                ? "bg-red-900/30 text-red-400 border border-red-800/50"
                                : "bg-yellow-900/30 text-yellow-400 border border-yellow-800/50"
                          }`}>
                            {txn.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-300">{txn.date}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTransactions.length === 0 ? (
              <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 text-center">
                <svg className="w-12 h-12 mx-auto text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12a5 5 0 00-5 5h10a5 5 0 00-5-5z"></path>
                </svg>
                <p className="text-gray-400">No transactions found matching your filters</p>
              </div>
            ) : (
              filteredTransactions.map((txn) => (
                <div
                  key={txn._id}
                  className="relative overflow-hidden group"
                >
                  <div className="absolute -inset-1 bg-blue-500/5 rounded-xl blur-sm opacity-70 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-4 rounded-xl border border-gray-700/60 shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                    <div className="flex justify-between items-center mb-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        txn.type === "deposit" 
                          ? "bg-blue-900/30 text-blue-400 border border-blue-800/50" 
                          : txn.type === "withdraw"
                            ? "bg-purple-900/30 text-purple-400 border border-purple-800/50"
                            : txn.type === "transfer"
                              ? "bg-teal-900/30 text-teal-400 border border-teal-800/50"
                              : "bg-amber-900/30 text-amber-400 border border-amber-800/50"
                        }`}>
                        {txn.type}
                      </span>
                      
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        txn.status === "success"
                          ? "bg-green-900/30 text-green-400 border border-green-800/50"
                          : txn.status === "failed"
                            ? "bg-red-900/30 text-red-400 border border-red-800/50"
                            : "bg-yellow-900/30 text-yellow-400 border border-yellow-800/50"
                        }`}>
                        {txn.status}
                      </span>
                    </div>
                    
                    <div className="bg-black/20 p-3 rounded-lg mb-3">
                      <p className="text-center">
                        <span className="text-2xl font-bold text-white">${txn.amount}</span>
                      </p>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="text-gray-400 inline-block w-24">ID:</span>
                        <span className="text-gray-300">{txn._id}</span>
                      </p>
                      <p>
                        <span className="text-gray-400 inline-block w-24">Sender:</span>
                        <span className="text-gray-300">{txn.sender}</span>
                      </p>
                      <p>
                        <span className="text-gray-400 inline-block w-24">Receiver:</span>
                        <span className="text-gray-300">{txn.receiver}</span>
                      </p>
                      <p>
                        <span className="text-gray-400 inline-block w-24">Date:</span>
                        <span className="text-gray-300">{txn.date}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Transaction;
