import React from "react";
import { auth, provider } from "../config/firebase-config";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState(null);

  // Google Auth

  const signInWithGoogle = async () => {
    try {
      const results = await signInWithPopup(auth, provider);

      const authInfo = {
        userId: results.user.uid,
        name: results.user.displayName,
        profilePhoto: results.user.photoURL,
        isloggedIn: true,
      };

      localStorage.setItem("auth", JSON.stringify(authInfo));
      navigate("/expense-tracker");
    } catch (error) {
      console.error("Google sign-in failed", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const results = await signInWithEmailAndPassword(auth, email, password);

      const userDocRef = doc(db, "users", results.user.uid);
      const userSnap = await getDoc(userDocRef);

      let name = results.user.displayName || "User";
      let imageURL = "";

      if (userSnap.exists()) {
        const userData = userSnap.data();
        name = `${userData.firstName} ${userData.lastName}`;
        imageURL = userData.imageURL;
      }

      const authInfo = {
        userId: results.user.uid,
        name,
        email: results.user.email,
        isloggedIn: true,
        profilePhoto: imageURL,
      };

      localStorage.setItem("auth", JSON.stringify(authInfo));
      navigate("/expense-tracker");
    } catch (error) {
      console.error("Login failed", error);
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-4">
          Welcome Back
        </h2>
        <p className="text-gray-600 text-center mb-6">Login to your account</p>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Error Message */}
          <div
            className={`bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-sm mt-2 ${
              errorMessage === null ? "hidden" : ""
            } `}
          >
            <p>{errorMessage}</p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </div>

        <div className="mt-8 border-t pt-6 text-center">
          <p className="text-sm text-gray-500 mb-3">or</p>
          <button
            onClick={signInWithGoogle}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-all duration-300"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
