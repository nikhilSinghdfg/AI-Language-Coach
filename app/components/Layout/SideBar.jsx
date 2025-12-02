"use client";

import React from 'react';
import Link from 'next/link';
import { FaHome } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineMessage } from "react-icons/md";
import { FaRobot } from "react-icons/fa6";
import { FaChartBar } from "react-icons/fa";
import { useAppContext } from '../../Context/UserContext';
import toast from "react-hot-toast";
import useAuthFetch from '../../../utils/useAuthFetch';
import { useRouter } from "next/navigation";
import {useThemeContext} from '../../Context/ThemeContext';

function SideBar() {
  const { setIsLogin, setUserData } = useAppContext();
  const { theme } = useThemeContext();

  const { authFetch } = useAuthFetch();
  const router = useRouter();

  const LogoutFun = async (e) => {
    e.preventDefault();
    try {
      await authFetch({ url: '/api/users/logout', method: 'post' });
      setIsLogin(false);
      setUserData(null);
      toast.success("Logout Successful");
      router.push("/pages/Dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed ⚠️ Try again");
    }
  };

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, link: "/pages/Dashboard" },
    { name: "Practice", icon: <FaRobot />, link: "/pages/Conversation" },
    { name: "Chat History", icon: <MdOutlineMessage />, link: "/pages/ChatHistory" },
    { name: "Insights", icon: <FaChartBar />, link: "/pages/Report" },
    { name: "Settings", icon: <IoMdSettings />, link: "/pages/Setting" },
  ];

  return (
    <div
      className={`
        fixed top-0 left-0 h-screen w-64 z-50 flex flex-col justify-between border-r shadow-md
        ${theme ? "bg-gray-900 border-gray-700 text-white" : "bg-gray-100 border-gray-200 text-black"}
      `}
    >

      {/* Logo */}
      <div
        className={`
          h-16 flex items-center justify-center border-b
          ${theme ? "border-gray-700" : "border-gray-200"}
        `}
      >
        <Link href="/pages/Dashboard">
          <img src="/I.jpg" alt="logo" className="h-14 w-auto cursor-pointer" />
        </Link>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 flex flex-col justify-between mt-4 px-2">
        <div className="flex flex-col gap-9">
          {menuItems.map((item, index) => (
            <div key={index} className="group relative">
              <Link
                href={item.link}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl font-medium w-full transition-colors duration-200
                  ${theme
                    ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                    : "text-gray-800 hover:bg-blue-50 hover:text-blue-600"
                  }
                `}
              >
                {item.icon}
                <span className="flex-1">{item.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </nav>

      {/* Logout Button */}
      <div className="mb-6 px-4">
        <button
          onClick={LogoutFun}
          className={`
            w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors duration-200
            ${theme
              ? "bg-red-900/30 text-red-300 hover:bg-red-800 hover:text-white"
              : "bg-red-50 text-red-700 hover:bg-red-100"
            }
          `}
        >
          <FiLogOut /> Logout
        </button>
      </div>

    </div>
  );
}

export default SideBar;
