import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { uploadImage } from "../config/upload";
import { db } from "../config/firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase-config";

const RegisterUser = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cover, setCover] = useState({
    file: null,
    url: "",
  });

  const handleCover = (e) => {
    if (e.target.files[0]) {
      setCover({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { firstName, lastName, email, password } = Object.fromEntries(
      formData.entries()
    );

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      let imageURL = "";

      if (cover.file) {
        const filePath = `user-covers/${Date.now()}_${cover.file.name}`;

        imageURL = await uploadImage(cover.file, filePath);
        if (!imageURL) throw new Error("Failed to upload image");
      }
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        firstName,
        lastName,
        email: user.email,
        imageURL,
        createdAt: new Date(),
      });
      navigate("/");
      console.log("User registered successfully");
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error(
        error.code === "auth/email-already-in-use"
          ? "Email already in use. Try logging in instead."
          : "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <ToastContainer position="top-center" />

      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-4">
          Create an Account
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Fill in the details to register
        </p>

        <form className="space-y-4" onSubmit={handleRegistration}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              name="firstName"
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your first name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              name="lastName"
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your last name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Create a password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Cover Photo
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <div className="w-16 h-16 mb-3 rounded-full bg-blue-200 flex items-center justify-center overflow-hidden">
                    {cover?.url ? (
                      <img
                        src={cover?.url}
                        alt="Cover image"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <PhotoIcon
                        className="w-10 h-10 text-blue-500"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <p className="mb-1 text-sm text-blue-600">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, JPEG (Max 5MB)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleCover}
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        <p className="text-sm text-gray-600 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterUser;
