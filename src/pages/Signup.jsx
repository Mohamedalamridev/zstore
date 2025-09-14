import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Signup() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleSignup = async () => {
    const response = await fetch(`${baseUrl}/api/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      credentials: "include",
      body: JSON.stringify({ name, email, password }),
    });
    const result = await response.json();
    setMessage(result.message);
    if (response.ok) {
      navigate("/login");
    }
  };
  return (
    <>
      <Navbar />
      <main className="w-full p-4 min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Create an Account
          </h2>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSignup();
            }}
          >
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Sign Up
            </button>
            {message && message}
          </form>

          {/* Already have account */}
          <p className="text-sm text-gray-600 text-center mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-black font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}

export default Signup;
