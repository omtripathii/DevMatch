import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // Mode: "login" or "signup"
  const [mode, setMode] = useState("login");
  // Toggle forgot password form (only on Login mode)
  const [showForgot, setShowForgot] = useState(false);

  // Login state (default values as per your original UI)
  const [loginEmail, setLoginEmail] = useState("Suresh@gmail.com");
  const [loginPassword, setLoginPassword] = useState("Suresh123@");

  // Signup state (no default values)
  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupLastName, setSignupLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // Forgot Password state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle Login (keeps your original functionality)
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email: loginEmail,
          password: loginPassword,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName: signupFirstName,
          lastName: signupLastName,
          email: signupEmail,
          password: signupPassword,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data))
      return  navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Signup failed");
    }
  };

  // Handle Forgot Password using PATCH API
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        BASE_URL + "/profile/change-password",
        {
          oldPassword,
          newPassword,
        },
        { withCredentials: true }
      );
      alert("Password updated successfully");
      setShowForgot(false);
    } catch (err) {
      setError(err?.response?.data || "Password update failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Toggle between Login and Signup */}
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 ${mode === "login" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"} rounded-l-lg`}
            onClick={() => {
              setMode("login");
              setError("");
              setShowForgot(false);
            }}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 ${mode === "signup" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"} rounded-r-lg`}
            onClick={() => {
              setMode("signup");
              setError("");
              setShowForgot(false);
            }}
          >
            Signup
          </button>
        </div>

        {mode === "login" && (
          <form onSubmit={handleLogin}>
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
              Login
            </h2>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm mb-2" htmlFor="loginEmail">
                Email
              </label>
              <input
                type="email"
                id="loginEmail"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                placeholder="Enter your email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-600 text-sm mb-2" htmlFor="loginPassword">
                Password
              </label>
              <input
                type="password"
                id="loginPassword"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                placeholder="Enter your password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 my-2">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              Sign In
            </button>
            <div className="flex justify-between items-center mt-4">
              <button
                type="button"
                className="text-blue-500 underline text-sm"
                onClick={() => setShowForgot(!showForgot)}
              >
                Reset Password?
              </button>
            </div>
            {showForgot && (
              <div className="mt-4 border-t pt-4">
                <div className="mb-4">
                  <label className="block text-gray-600 text-sm mb-2" htmlFor="oldPassword">
                    Old Password
                  </label>
                  <input
                    type="password"
                    id="oldPassword"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    placeholder="Enter your old password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600 text-sm mb-2" htmlFor="newPassword">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-300 mt-4 my-7"
                >
                  Change Password
                </button>
              </div>
            )}
          </form>
        )}

        {mode === "signup" && (
          <form onSubmit={handleSignup}>
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
              Signup
            </h2>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm mb-2" htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                placeholder="Enter your first name"
                value={signupFirstName}
                onChange={(e) => setSignupFirstName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm mb-2" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                placeholder="Enter your last name"
                value={signupLastName}
                onChange={(e) => setSignupLastName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm mb-2" htmlFor="signupEmail">
                Email
              </label>
              <input
                type="email"
                id="signupEmail"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                placeholder="Enter your email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-600 text-sm mb-2" htmlFor="signupPassword">
                Password
              </label>
              <input
                type="password"
                id="signupPassword"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                placeholder="Enter your password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 my-2">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
