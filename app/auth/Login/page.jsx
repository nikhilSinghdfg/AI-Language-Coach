"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { MdEmail, MdWifiPassword } from "react-icons/md";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "../../../utils/api";
import { useAppContext } from "../../Context/UserContext";


export default function Login() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });
  const router = useRouter();
  const { setIsLogin, setUserData } = useAppContext()




  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  const handleLogin = async (e) => {
    if (loading) return;

    e.preventDefault();
    if (!user.email || !user.password) {
      return toast.error("Please fill all fields 📝");
    }

    try {
      setLoading(true);
      const res = await api.post("/api/users/login", user);
      console.log("Login successfull", res.data);
      toast.success("Login Successful 🎉");
      setUserData(res.data.user)
      setIsLogin(true)


      router.push("/pages/Dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed ⚠️ Try again");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex items-center justify-center p-5">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="bg-white w-full max-w-sm shadow-xl rounded-2xl p-8 border border-gray-300"
      >
        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          <div className="text-center">
            <h1 className="text-2xl font-semibold py-2">Login</h1>
            <p className="text-gray-500 text-sm">
              Welcome back! Please sign in to continue.
            </p>
          </div>

          {/* Email */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2">
            <MdEmail className="text-gray-600" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2">
            <MdWifiPassword className="text-gray-600" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              required
              className="w-full outline-none"
            />
          </div>

          <div className="text-right -mt-2">
            <p className="text-sm text-blue-600 hover:underline cursor-pointer">
              Forgot Password?
            </p>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-medium text-white transition
              ${loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
              }`}
          >
            {loading ? "Logging..." : "Login"}
          </button>

          {/* Signup Link */}
          <div className="text-center text-sm">
            <span className="text-gray-600">Don't have an account? </span>
            <Link href="/auth/Signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
