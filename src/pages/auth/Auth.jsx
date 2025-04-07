import React from "react";
import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  let navigate = useNavigate();

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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Sign in to continue
        </h1>
        <p className="text-gray-600 mb-6">Use your Google account below</p>
        <button
          onClick={signInWithGoogle}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-all duration-300"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Auth;
