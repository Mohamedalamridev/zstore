import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useUser } from "../UserContext";

function Signup() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameMessage, setNameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [validPasswordMessage, setValidPasswordMessage] = useState("");
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const { loading } = useUser();
  const navigate = useNavigate();

  // validate email
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) {
      setEmailMessage("Email is required");
      return false;
    } else if (!emailRegex.test(value)) {
      setEmailMessage("Please enter a valid email");
      return false;
    }
    setEmailMessage("");
    return true;
  };

  // validate password
  const validatePassword = (value) => {
    if (!value) {
      setValidPasswordMessage("Password is required");
      return false;
    } else if (value.length < 8) {
      setValidPasswordMessage("Password must be at least 8 characters");
      return false;
    }
    setValidPasswordMessage("");
    return true;
  };

  // validate confirm password
  const validateConfirmPassword = (value) => {
    if (!value) {
      setConfirmPasswordMessage("Please confirm your password");
      return false;
    } else if (value !== password) {
      setConfirmPasswordMessage("Passwords do not match");
      return false;
    }
    setConfirmPasswordMessage("");
    return true;
  };

  //  validate name
  const validateName = (value) => {
    if (!value.trim()) {
      setNameMessage("Name is required");
      return false;
    }
    setNameMessage("");
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);

    if (
      !isNameValid ||
      !isEmailValid ||
      !isPasswordValid ||
      !isConfirmPasswordValid
    )
      return;

    try {
      const response = await fetch(`${baseUrl}/api/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        setServerMessage(result.message || "Signup failed");
      }
    } catch (error) {
      setServerMessage("Server error, please try again later.");
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
          {/* Server Error */}
          {serverMessage !== "" && (
            <p className="p-3 mb-3 rounded-md text-red-600 bg-red-100 ">
              {serverMessage}
            </p>
          )}
          <form className="space-y-4" onSubmit={handleSignup}>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  validateName(e.target.value);
                }}
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              />
              <p className="text-sm text-red-500">{nameMessage}</p>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              />
              <p className="text-sm text-red-500">{emailMessage}</p>
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
                  validatePassword(e.target.value);
                }}
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              />
              <p className="text-sm text-red-500">{validPasswordMessage}</p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  validateConfirmPassword(e.target.value);
                }}
                type="password"
                placeholder="Confirm your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              />
              <p className="text-sm text-red-500">{confirmPasswordMessage}</p>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
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
