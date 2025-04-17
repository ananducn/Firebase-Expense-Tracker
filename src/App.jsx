import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./pages/Login.jsx";
import ExpenseTracker from "./pages/ExpenseTracker.jsx";
import RegisterUser from "./pages/RegisterUser.jsx";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/expense-tracker" element={<ExpenseTracker />} />
          <Route path="/register" element={<RegisterUser />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
