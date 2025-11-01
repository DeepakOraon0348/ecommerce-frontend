import React, { useState } from "react";
import axios from "axios";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Correct API URLs according to your backend
    const url = isLogin
      ? "https://ecommarce-backend-mu.vercel.app/users/login"
      : "https://ecommarce-backend-mu.vercel.app/users/register";

    try {
      const res = await axios.post(url, form);

      // ✅ Store both token and userId after login
      if (isLogin) {
        localStorage.setItem("token", res.data.token);

        // some backends also return user details; if not, store manually
        if (res.data.user && res.data.user._id) {
          localStorage.setItem("userId", res.data.user._id);
        } else {
          console.warn("⚠️ userId not found in response");
        }

        alert("✅ Logged in successfully!");
        window.location.href = "/";
      } else {
        alert("✅ Registered successfully! Please log in.");
        setIsLogin(true);
      }
    } catch (error) {
      console.error("Auth error:", error.response?.data || error.message);
      alert("❌ Invalid credentials or server error.");
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh] bg-gray-50">
      <div className="bg-white p-8 shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          {isLogin ? "Login" : "Register"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p
          className="text-blue-500 text-center mt-4 cursor-pointer hover:underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Create new account" : "Already have an account?"}
        </p>
      </div>
    </div>
  );
};

export default Auth;
