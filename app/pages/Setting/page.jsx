"use client";

import React from 'react'
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import SideBar from '../../components/Layout/SideBar';
import { useAppContext } from '../../Context/UserContext.js';
import Link from 'next/link.js';
import { FaRegUser } from "react-icons/fa";
import { MdOutlineDarkMode, MdOutlineDelete } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoChevronBackOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { useThemeContext } from '../../Context/ThemeContext.js';
import { RiUserSettingsLine } from "react-icons/ri";
import { FiCreditCard } from "react-icons/fi";
import { FiDownload } from "react-icons/fi";
import { FaRegMessage } from "react-icons/fa6";


function Setting() {
  const { isLogin } = useAppContext();
  const { theme } = useThemeContext();

  const settingsOptions = [
    { name: "Profile", icon: <FaRegUser />, link: "/components/Setting/ProfileSettings" },
    { name: "Appearance", icon: <MdOutlineDarkMode />, link: "/components/Setting/AppearanceSettings" },
    { name: "Subscription", icon: <FiCreditCard />, link: "/components/Setting/Subscription" },
    { name: "Account Update", icon: <RiUserSettingsLine />, link: "/components/Setting/AccountSettings" },
    { name: "Downloads", icon: <FiDownload />, link: "/components/Setting/Downloads" },
    { name: "AI Chat Settings", icon: <FaRegMessage />, link: "/components/Setting/AiPreferences" },

  ];

  return (
    <div className="flex">
      {isLogin && <SideBar />}

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="pt-16 w-100% h-screen  ml-64">
          <div className={`p-6 sm:p-10 min-h-screen transition-all ${theme ? "bg-gray-900" : "bg-white"}`}>

            {/* Back Button */}
            <Link
              href="/pages/Dashboard"
              className={`flex items-center mb-6 text-sm hover:text-blue-600 ${theme ? "text-gray-300" : "text-gray-600"}`}
            >
              <IoChevronBackOutline className="mr-2" /> Back to Dashboard
            </Link>

            {/* Title */}
            <h1 className={`text-3xl font-semibold mb-4 ${theme ? "text-white" : "text-gray-800"}`}>
              Settings
            </h1>
            <p className={`mb-8 sm:max-w-lg ${theme ? "text-gray-400" : "text-gray-600"}`}>
              Manage your account preferences, appearance, and privacy settings.
            </p>

            {/* Settings List */}
            <div className="space-y-4">
              {settingsOptions.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.link}
                    className={`flex items-center justify-between p-4 rounded-xl shadow-sm transition-all
                      ${theme ? "bg-gray-800 hover:bg-gray-700 text-gray-200" : "bg-gray-50 hover:bg-gray-100 text-gray-800"}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`text-xl ${theme ? "text-gray-200" : "text-gray-700"}`}>
                        {item.icon}
                      </div>
                      <span className={`font-medium ${theme ? "text-white" : "text-gray-800"}`}>
                        {item.name}
                      </span>
                    </div>
                    <span className={`${theme ? "text-gray-400" : "text-gray-500"}`}>›</span>
                  </Link>
                </motion.div>
              ))}
            </div>

          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default Setting;
