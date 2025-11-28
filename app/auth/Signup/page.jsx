"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MdEmail, MdWifiPassword } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import api from "../../../utils/api";
import { useAppContext } from "../../Context/UserContext";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setIsLogin } = useAppContext()
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });





  // 🚨 Corrected handle function
  const handleUser = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!user.username || !user.email || !user.password) {
      return toast.error("Please fill all fields 📝");
    }

    try {
      setLoading(true);
      const res = await api.post("/api/users/signup", user);
      console.log("Signup clicked", res.data);
      toast.success("Signup Successful 🎉");
      router.push("/auth/Login");
    } catch (error) {
      console.error(error);
      toast.error("Signup failed ⚠️ Try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="bg-white w-full max-w-sm rounded-xl shadow-lg p-8 border border-gray-300"
      >
        <form onSubmit={handleSignup} className="space-y-4">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Sign Up</h1>
            <p className="text-gray-500 text-sm">Create an account to get started</p>
          </div>

          {/* Username */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2">
            <FaUser className="text-gray-600" />
            <input
              name="username" // 🔥 added
              type="text"
              placeholder="Full Name"
              value={user.username}
              onChange={handleUser}
              className="w-full outline-none"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2">
            <MdEmail className="text-gray-600" />
            <input
              name="email" // 🔥 added
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={handleUser}
              className="w-full outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2">
            <MdWifiPassword className="text-gray-600" />
            <input
              name="password" // 🔥 added
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={handleUser}
              className="w-full outline-none"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-medium text-white transition
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 cursor-pointer"}
            `}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {/* Login Link */}
          <div className="text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <Link href="/auth/Login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
