import React from "react";
import { useAddTransactions } from "../../hooks/useAddTransactions";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useGetTransaction } from "../../hooks/useGetTransaction";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";

const ExpenseTracker = () => {
  const { addTransaction } = useAddTransactions();
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionType, setTransactionType] = useState("expense");
  const { transactions } = useGetTransaction();
  const { name } = useGetUserInfo();

  const onSubmit = async (e) => {
    e.preventDefault();
    addTransaction({ description, transactionAmount, transactionType });
    setDescription("");
    setTransactionAmount("");
    setTransactionType("expense");
    toast.success("Transaction added successfully!");
  };

  const totalIncome = transactions
    .filter((transaction) => transaction.transactionType === "income")
    .reduce((acc, curr) => acc + Number(curr.transactionAmount), 0);
  const totalExpense = transactions
    .filter((transaction) => transaction.transactionType === "expense")
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
        <div className="flex flex-col lg:flex-row gap-6 max-w-[1440px] mx-auto h-[calc(100vh-3rem)]">
          {/* Left Section: Form */}
          <div className="flex-1 bg-white shadow-2xl rounded-2xl p-6 h-full flex flex-col">
            <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
              {name}'s Expense Tracker 💰
            </h1>

            {/* Balance */}
            <div className="mb-8 text-center">
              <h3 className="text-lg text-gray-600">Your Balance</h3>
              <h2 className="text-2xl font-semibold text-green-600">
                ₹{totalBalance}
              </h2>
            </div>

            {/* Income & Expense Summary */}
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
                    required
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
                    required
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

          {/* Right Section: Transaction History */}
          <div className="flex-1 bg-white shadow-2xl rounded-2xl p-6 h-full overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Transactions History
            </h3>
            {transactions.length === 0 ? (
              <p className="text-gray-500 text-center">No transactions yet.</p>
            ) : (
              <ul className="space-y-4">
                {transactions.map((transactions, index) => {
                  const { description, transactionAmount, transactionType } =
                    transactions;
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
      </div>
    </>
  );
};

export default ExpenseTracker;
