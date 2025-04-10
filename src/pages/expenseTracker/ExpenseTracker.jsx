import React, { useState } from "react";
import { useAddTransactions } from "../../hooks/useAddTransactions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetTransaction } from "../../hooks/useGetTransaction";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import TransactionChart from "../../components/TransactionChart";

const ExpenseTracker = () => {
  const { addTransaction } = useAddTransactions();
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionType, setTransactionType] = useState("expense");
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();
  const month = new Date().toLocaleString("default", { month: "long" });
  const [selectedMonth, setSelectedMonth] = useState(month);
  const { transactions } = useGetTransaction(selectedMonth);

  const onSubmit = async (e) => {
    e.preventDefault();
    addTransaction({ description, transactionAmount, transactionType, month });
    setDescription("");
    setTransactionAmount("");
    setTransactionType("expense");
    toast.success("Transaction added successfully!");
  };

  const signout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };

  const totalIncome = transactions
    .filter((t) => t.transactionType === "income")
    .reduce((acc, curr) => acc + Number(curr.transactionAmount), 0);

  const totalExpense = transactions
    .filter((t) => t.transactionType === "expense")
    .reduce((acc, curr) => acc + Number(curr.transactionAmount), 0);

  const totalBalance = totalIncome - totalExpense;

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
      />

      <div className="min-h-screen bg-gray-100 p-6">
        <div className="flex flex-col lg:flex-row gap-6 max-w-[1440px] mx-auto md:h-[calc(100vh-3rem)]">
          {/* Left Section */}
          <div className="md:flex-1 bg-white shadow-2xl rounded-2xl p-6 order-2  lg:order-1 flex flex-col">
            {/* Chart on Top */}
            <div className="mb-6">
              <TransactionChart income={totalIncome} expense={totalExpense} />
            </div>

            {/* Transaction List (Scrollable) */}
            <div className="flex-1 overflow-y-auto max-h-[400px] pr-2">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Transactions History
              </h3>
              {transactions.length === 0 ? (
                <p className="text-gray-500 text-center">
                  No transactions yet.
                </p>
              ) : (
                <ul className="space-y-4">
                  {transactions.map((transaction, index) => {
                    const { description, transactionAmount, transactionType } =
                      transaction;
                    return (
                      <li
                        key={index}
                        className={`flex justify-between items-center p-4 rounded-xl shadow-sm ${
                          transactionType === "income"
                            ? "bg-green-50"
                            : "bg-red-50"
                        }`}
                      >
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {description}
                          </h4>
                          <p className="text-sm text-gray-600 capitalize">
                            {transactionType}
                          </p>
                        </div>
                        <span
                          className={`text-lg font-bold ${
                            transactionType === "income"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          ₹{transactionAmount}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>

          {/* Right Section: Form and Summary */}
          <div className="flex-1 bg-white shadow-2xl rounded-2xl p-6 h-full flex flex-col order-1 lg:order-2">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className=" w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                />
                <h1 className="text-lg md:text-2xl font-bold text-blue-600">
                  {name}'s Tracker 💰
                </h1>
              </div>
              <button
                onClick={signout}
                className="text-xs md:text-sm bg-red-100 text-red-600 font-semibold px-2 py-1 md:px-4 md:py-2 rounded-lg hover:bg-red-200 transition duration-200"
              >
                Sign Out
              </button>
            </div>

            {/* Balance */}
            <div className="mb-6 text-center">
              <h3 className="text-lg text-gray-600">Your Balance</h3>
              <h2 className="text-2xl font-semibold text-green-600">
                ₹{totalBalance}
              </h2>
            </div>

            {/* Month Selection */}
            <div className="mb-6">
              <label className="text-gray-700 font-medium mr-2">
                Filter by Month:
              </label>
              <select
                className="border border-gray-300 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-green-100 p-4 rounded-lg shadow-sm">
                <h3 className="text-md font-medium text-green-800">Income</h3>
                <h2 className="text-lg font-semibold text-green-700">
                  ₹{totalIncome}
                </h2>
              </div>
              <div className="bg-red-100 p-4 rounded-lg shadow-sm">
                <h3 className="text-md font-medium text-red-800">Expense</h3>
                <h2 className="text-lg font-semibold text-red-700">
                  ₹{totalExpense}
                </h2>
              </div>
            </div>

            {/* Form */}
            <form
              className="bg-gray-50 p-6 rounded-xl shadow-md text-left space-y-4 mt-auto"
              onSubmit={onSubmit}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Add Transaction
              </h2>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  value={description}
                  type="text"
                  placeholder="e.g. Salary or Food"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Amount
                </label>
                <input
                  value={transactionAmount}
                  type="number"
                  placeholder="₹"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) => setTransactionAmount(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-6 mt-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="expense"
                    name="type"
                    value="expense"
                    checked={transactionType === "expense"}
                    className="mr-2"
                    onChange={(e) => setTransactionType(e.target.value)}
                  />
                  <label htmlFor="expense" className="text-sm text-gray-700">
                    Expense
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="income"
                    name="type"
                    value="income"
                    checked={transactionType === "income"}
                    className="mr-2"
                    onChange={(e) => setTransactionType(e.target.value)}
                  />
                  <label htmlFor="income" className="text-sm text-gray-700">
                    Income
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
              >
                Add Transaction
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpenseTracker;
