"use client";

import React from 'react';
import Header from '../../Layout/Header.jsx';
import Footer from '../../Layout/Footer.jsx';
import SideBar from '../../Layout/SideBar.jsx';
import { useThemeContext } from '../../../Context/ThemeContext';
import { useAppContext } from '../../../Context/UserContext.js';
import { IoChevronBackOutline } from "react-icons/io5";
import Link from 'next/link.js';
import { useState } from 'react';
import { FaSun, FaMoon } from "react-icons/fa";
import { Sun, Moon } from "lucide-react";




function AppearanceSettings() {
  const { theme, toggleTheme, fontSize, setFontSize } = useThemeContext();
  const { isLogin } = useAppContext();

 



  return (
    <>
      <div className="flex min-h-screen">
        {isLogin && <SideBar />}

        <div className="flex-1 flex flex-col">
          <Header />

          <main className={`pt-20 transition-all min-h-screen ${theme ? "bg-gray-900" : "bg-gray-50"} transition-colors duration-300`}>
            <div className="max-w-3xl mx-auto p-6">

              <Link href="/pages/Setting"
                className={`flex items-center ${theme ? "text-gray-300" : "text-gray-600"} hover:text-blue-600 text-sm  mb-6 transition`}
              >
                <IoChevronBackOutline className="mr-2" /> Back to Settings
              </Link>

              <h1 className={`font-semibold text-2xl mb-6 ${theme ? "text-white" : "text-gray-800"} transition-colors duration-300`}>Appearance Settings</h1>
              <p className={`mb-8 ${theme ? "text-gray-300" : "text-gray-600"}`}>
                Customize the look and feel of your application. You can enable dark mode, adjust font sizes, and more.
              </p>

              {/* Dark Mode Toggle */}

              <div
                className={`w-full p-4 mb-6 rounded-2xl flex items-center justify-between 
  ${theme ? "bg-gray-800" : "bg-gray-100"}`}
              >
                <div>
                  <h2 className={`text-lg font-semibold ${theme ? "text-white" : "text-gray-800"}`}>
                    Dark Mode
                  </h2>
                  <p className={`text-sm ${theme ? "text-gray-300" : "text-gray-500"}`}>
                    Enable dark theme for the app
                  </p>
                </div>

                {/* Toggle Button */}
                <button
                  onClick={toggleTheme}
                  className="  transition-all duration-300 w-12 pb-9 cursor-pointer"
                >
                  {/* Inner Circle */}
                  <div
                    className={`absolute w-8 h-8 bg-gray-100 border rounded-full shadow-md flex items-center justify-center 
        transition-all duration-500 
        ${theme ? "translate-x-10" : "translate-x-1"}`}
                  >
                    {theme ? (
                      <FaMoon className="text-gray-800 w-5 h-5" />
                    ) : (
                      <FaSun className="text-yellow-500 w-6 h-6" />
                    )}
                  </div>
                </button>
              </div>




              {/* Font Size Settings */}
              <div className={`w-full p-4 mb-6 rounded-2xl ${theme ? "bg-gray-800" : "bg-gray-100"} transition-colors duration-300`}>
                <h2 className={`text-lg font-semibold mb-2 ${theme ? "text-white" : "text-gray-800"} transition-colors duration-300`}>Font Size</h2>
                <p className={`text-sm mb-4 ${theme ? "text-gray-300" : "text-gray-500"} transition-colors duration-300`}>Adjust the font size across the app.</p>
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer transition " onClick={()=>setFontSize("small")}>Small</button>
                  <button className="px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer transition"  onClick={()=>setFontSize("medium")}>Medium</button>
                  <button className="px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer transition"  onClick={()=>setFontSize("large")}>Large</button>
                </div>
              </div>

              {/* Sidebar Layout */}
              <div className={`w-full p-4 mb-6 rounded-2xl ${theme ? "bg-gray-800" : "bg-gray-100"} transition-colors duration-300`}>
                <h2 className={`text-lg font-semibold mb-2 ${theme ? "text-white" : "text-gray-800"} transition-colors duration-300 `}>Sidebar Layout</h2>
                <p className={`text-sm mb-4 ${theme ? "text-gray-300" : "text-gray-500"} transition-colors duration-300`}>Choose your sidebar display preference.</p>
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer transition">Expanded</button>
                  <button className="px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer transition">Collapsed</button>
                </div>
              </div>

              {/* Accent Color */}
              <div className={`w-full p-4 mb-6 rounded-2xl ${theme ? "bg-gray-800" : "bg-gray-100"} transition-colors duration-300`}>
                <h2 className={`text-lg font-semibold mb-2 ${theme ? "text-white" : "text-gray-800"} not-visited:transition-colors duration-300 `}>Accent Color</h2>
                <p className={`text-sm mb-4 ${theme ? "text-gray-300" : "text-gray-500"}`}>Select an accent color for buttons and highlights.</p>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full cursor-pointer hover:ring-2 hover:ring-blue-400 transition" />
                  <div className="w-8 h-8 bg-red-600 rounded-full cursor-pointer hover:ring-2 hover:ring-red-400 transition" />
                  <div className="w-8 h-8 bg-green-600 rounded-full cursor-pointer hover:ring-2 hover:ring-green-400 transition" />
                  <div className="w-8 h-8 bg-yellow-500 rounded-full cursor-pointer hover:ring-2 hover:ring-yellow-300 transition" />
                </div>


<div className={
  fontSize === 'small' ? "text-sm text-blue-600" :
  fontSize === 'medium' ? "text-bg text-red-800" :
  "text-lg text-green-800"
}>
  dfdfdfdf
</div>


              </div>





            </div>
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
}

export default AppearanceSettings;
