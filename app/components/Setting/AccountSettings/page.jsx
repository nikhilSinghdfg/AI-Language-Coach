"use client";

import React, { useState } from 'react';
import Header from '../../Layout/Header.jsx';
import Footer from '../../Layout/Footer.jsx';
import SideBar from '../../Layout/SideBar.jsx';
import { useThemeContext } from '../../../Context/ThemeContext.js';
import { useAppContext } from '../../../Context/UserContext.js';
import { IoChevronBackOutline } from "react-icons/io5";
import Link from 'next/link.js';
import { FaUser } from "react-icons/fa";
import { MdEmail, MdWifiPassword } from "react-icons/md";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import useAuthFetch from '../../../../utils/useAuthFetch.js';
import { useRouter } from "next/navigation";


function AccountSettings() {
  const { theme } = useThemeContext();
  const { isLogin,setUserData } = useAppContext();
  const { authFetch } = useAuthFetch();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const updateForm = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const updateFields = async () => {
    setLoading(true);
    try {
    const newRes=  await authFetch({
        url: '/api/users/update',
        method: 'PATCH',
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" }
      });
      toast.success("Profile updated successfully!");
         setUserData(newRes.data.user);
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed ⚠️");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {isLogin && <SideBar />}
      <div className="flex-1 flex flex-col">
        <Header />

        <main className={`pt-20 transition-all min-h-screen ${theme ? "bg-gray-900" : "bg-gray-50"} transition-colors duration-300`}>
          <div className="max-w-3xl mx-auto p-6 space-y-6">

            <Link href="/pages/Setting"
              className={`flex items-center text-sm mb-4 ${theme ? "text-gray-300" : "text-gray-600"} hover:text-blue-600 transition`}
            >
              <IoChevronBackOutline className="mr-2" /> Back to Settings
            </Link>

            <h1 className={`font-semibold text-3xl mb-2 ${theme ? "text-white" : "text-gray-800"} transition-colors duration-300`}>
              Account Settings
            </h1>
            <p className={`mb-6 ${theme ? "text-gray-300" : "text-gray-600"}`}>
              Update your username, email, or password below.
            </p>

            {/* Username Field */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className={`p-6 rounded-2xl flex items-center gap-3 ${theme ? "bg-gray-800" : "bg-gray-100"} shadow transition-all`}
            >
              <FaUser className={`${theme ? "text-gray-200" : "text-gray-700"} text-xl`} />
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={form.username}
                onChange={updateForm}
                className={`flex-1 p-2 rounded-lg ${theme ? "bg-gray-700 text-white" : "bg-white text-gray-800"} focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
              />
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={`p-6 rounded-2xl flex items-center gap-3 ${theme ? "bg-gray-800" : "bg-gray-100"} shadow transition-all`}
            >
              <MdEmail className={`${theme ? "text-gray-200" : "text-gray-700"} text-xl`} />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={form.email}
                onChange={updateForm}
                className={`flex-1 p-2 rounded-lg ${theme ? "bg-gray-700 text-white" : "bg-white text-gray-800"} focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
              />
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className={`p-6 rounded-2xl flex items-center gap-3 ${theme ? "bg-gray-800" : "bg-gray-100"} shadow transition-all`}
            >
              <MdWifiPassword className={`${theme ? "text-gray-200" : "text-gray-700"} text-xl`} />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={updateForm}
                className={`flex-1 p-2 rounded-lg ${theme ? "bg-gray-700 text-white" : "bg-white text-gray-800"} focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
              />
            </motion.div>

            {/* Update Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-end"
            >
              <button
                onClick={updateFields}
                disabled={loading}
                className={`px-6 py-3 rounded-xl font-medium cursor-pointer shadow-md ${theme ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-600 text-white hover:bg-blue-700"} transition`}
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </motion.div>

          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default AccountSettings;
