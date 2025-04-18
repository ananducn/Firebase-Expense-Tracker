import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import ExpenseTracker from "./pages/ExpenseTracker.jsx";
import RegisterUser from "./pages/RegisterUser.jsx";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterUser />
              </PublicRoute>
            }
          />
          <Route
            path="/expense-tracker"
            element={
              <PrivateRoute>
                <ExpenseTracker />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
