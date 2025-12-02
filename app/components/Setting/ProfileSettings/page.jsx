"use client";

import React from 'react';
import Header from '../../Layout/Header.jsx';
import Footer from '../../Layout/Footer.jsx';
import SideBar from '../../Layout/SideBar.jsx';
import { useAppContext } from '../../../Context/UserContext.js';
import useAuthFetch from '../../../../utils/useAuthFetch.js';
import Link from 'next/link.js';
import { motion } from "framer-motion";
import { IoChevronBackOutline } from "react-icons/io5";
import { FaUser, FaCheckCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { toast } from "react-hot-toast";
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { useThemeContext } from '../../../Context/ThemeContext.js'; 

function ProfileSettings() {
  const { isLogin, setIsLogin, setUserData } = useAppContext();
  const { theme } = useThemeContext();
  
  const { authFetch } = useAuthFetch();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null)
  const router = useRouter();

  const LogoutFun = async (e) => {
    e.preventDefault();
    try {
      await authFetch({ url: '/api/users/logout', method: 'post' });
      setIsLogin(false);
      setUserData(null);
      toast.success("Logout Successful");
      router.push("/pages/Dashboard")
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed ⚠️ Try again");
    }
  };

  const deleteFun = async (e) => {
    e.preventDefault();
    if (!confirm("⚠️ Are you sure you want to permanently delete your account? This action cannot be undone.")) return;
    try {
      await authFetch({ url: '/api/users/profile', method: 'delete' });
      setIsLogin(false);
      setUserData(null);
      toast.success("Account deleted successfully");
      router.push("/pages/Dashboard")
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete account failed ⚠️ Try again");
    }
  };

  useEffect(() => {
    const getuserdata = async () => {
      try {
        const res = await authFetch({ url: '/api/users/profile', method: 'get' });
        setProfileData(res.data.user);
      } catch (err) {
        console.log("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }
    getuserdata()
  }, [])

  if (loading) {
    return (
      <div className={`flex justify-center items-center min-h-screen font-normal text-2xl ${theme ? "text-white" : "text-black"}`}>
        <p>Loading Profile...</p>
      </div>
    );
  }

  if (!profileData && !loading) {
    return <p className={theme ? "text-white" : ""}>Error loading profile</p>;
  }

  return (
    <div className="flex ">
      {isLogin && <SideBar />}
      <div className="flex-1 flex flex-col">
        <Header />

        <main className={`pt-16 ml-64 w-100% h-screen `}>
          <div className={`p-6 sm:p-10 min-h-screen transition-all ${theme ? "bg-gray-900" : "bg-white"}`}>
            {/* Back Button */}
            <Link
              href="/pages/Setting"
              className={`flex items-center ${theme ? "text-gray-300" : "text-gray-600"} hover:text-blue-600 text-sm mb-6 transition`}
            >
              <IoChevronBackOutline className="mr-2" /> Back to Settings
            </Link>

            {/* Title & Description */}
            <h1 className={`${theme ? "text-white" : "text-gray-800"} text-3xl font-semibold mb-2`}>
              Profile Information
            </h1>
            <p className={`${theme ? "text-gray-400" : "text-gray-600"} mb-8`}>
              Manage your personal details and keep your account up to date.
            </p>

            {/* Profile Card */}
            <div className={`p-6 rounded-2xl  transition-all
              ${theme ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
              <div className="space-y-4">
                {/* Username */}
                <motion.div key="username" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                  <div className={`flex items-center justify-between p-4 rounded-xl shadow-sm transition-all
                    ${theme ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-50 hover:bg-gray-100"}`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${theme ? "bg-gray-700" : "bg-gray-100"}`}>
                        <FaUser className={`${theme ? "text-gray-200" : "text-gray-700"} text-lg`} />
                      </div>
                      <span className={`${theme ? "text-white" : "text-gray-800"} font-medium`}>Username</span>
                    </div>
                    <span className={`${theme ? "text-gray-200" : "text-gray-700"}`}>{profileData?.username || "N/A"}</span>
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div key="email" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                  <div className={`flex items-center justify-between p-4 rounded-xl shadow-sm transition-all
                    ${theme ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-50 hover:bg-gray-100"}`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${theme ? "bg-gray-700" : "bg-gray-100"}`}>
                        <MdEmail className={`${theme ? "text-gray-200" : "text-gray-700"} text-lg`} />
                      </div>
                      <span className={`${theme ? "text-white" : "text-gray-800"} font-medium`}>Email</span>
                    </div>
                    <span className={`${theme ? "text-gray-200" : "text-gray-700"}`}>{profileData?.email || "N/A"}</span>
                  </div>
                </motion.div>

                {/* Verified */}
                <motion.div key="verified" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                  <div className={`flex items-center justify-between p-4 rounded-xl shadow-sm transition-all
                    ${theme ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-50 hover:bg-gray-100"}`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${theme ? "bg-gray-700" : "bg-gray-100"}`}>
                        <FaCheckCircle
                          className={profileData?.isVerify
                            ? "text-green-500"
                            : `${theme ? "text-gray-600" : "text-gray-400"}`
                          }
                        />
                      </div>
                      <span className={`${theme ? "text-white" : "text-gray-800"} font-medium`}>Verified</span>
                    </div>
                    <span className={profileData?.isVerify
                      ? "text-green-500 font-semibold"
                      : `${theme ? "text-gray-400" : "text-gray-500"}`
                    }>
                      {profileData?.isVerify ? "Yes" : "No"}
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Buttons Section */}
            <div className="flex justify-between mt-8">
              {/* Logout Button */}
              <button
                onClick={LogoutFun}
                className={`px-5 py-3 text-lg font-medium rounded-xl cursor-pointer shadow-sm transition-all
                  ${theme ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-gray-100 hover:bg-gray-200 text-black"} hover:text-red-600`}
              >
                Logout
              </button>

              {/* Delete Account Button */}
              <button
                onClick={deleteFun}
                className={`px-5 py-3 text-lg font-medium rounded-xl cursor-pointer shadow-md hover:shadow-lg transition-all
                  ${theme ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-gray-100 hover:bg-gray-200 text-black"} hover:text-red-600`}
              >
                Delete Account
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default ProfileSettings;
