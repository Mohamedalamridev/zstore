import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useUser } from "../UserContext";
import { useCart } from "../CartContext";
const baseUrl = import.meta.env.VITE_BASE_URL;
function Login() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch, loading } = useUser();
  const { state: cartState } = useCart();

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const userData = await response.json();

      if (!response.ok) {
        setMessage("Invalid Credential");
        return;
      }

      // dispatch login
      dispatch({ type: "LOGIN", payload: { userData } });

      // redirect logic
      if (cartState.cart.length > 0) {
        navigate("/cart");
      } else {
        navigate("/");
        setMessage("Login successful");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };
  return (
    <>
      <Navbar />
      <main className="w-full p-4 min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Welcome Back
          </h2>
          {message !== "" && (
            <p className="p-3 mb-3 rounded-md text-red-600 bg-red-100 ">
              {message}
            </p>
          )}
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
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
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
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
              {loading ? "Loading..." : "Login"}
            </button>
          </form>

          {/* Signup Link */}
          <p className="text-sm text-gray-600 text-center mt-6">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-black font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}

export default Login;
