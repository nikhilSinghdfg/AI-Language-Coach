
"use client";

import React from 'react';
import Link from 'next/link';
import { useAppContext } from '../../Context/UserContext';
import { useThemeContext } from '../../Context/ThemeContext';

function Header() {
  const { isLogin, userData, loading } = useAppContext();
  const { theme } = useThemeContext();

  if (loading) {
    return <div></div>;
  }

  return (
    <header
      className={`fixed 
        ${theme ? "bg-gray-900 text-white border-gray-700" : "bg-white text-black border-blue-100"}
        top-0 ${isLogin ? 'left-64 w-[calc(100%-16rem)]' : 'left-0 w-full'}
        h-16 border-b shadow-lg z-50`}
    >
      <nav className="flex items-center justify-between px-4 h-full">
        
        {isLogin ? (
          <>
            <div className="mt-8 mb-6">
              <h1 className={`text-xl font-medium tracking-tight 
                ${theme ? "text-white" : "text-gray-800"}`}>
                Welcome back, 
                <span className="font-semibold text-blue-600">
                  {userData?.username?.split(" ")[0].toUpperCase()}
                </span>
              </h1>

              <p className={`text-sm mt-1 
                ${theme ? "text-gray-300" : "text-gray-500"}`}>
                Here’s your overview
              </p>
            </div>

            <div className={`flex items-center gap-3 px-2 py-1 rounded-xl 
              ${theme ? "hover:bg-gray-700" : "hover:bg-gray-100"}
              transition-all duration-200 cursor-pointer`}
            >
              <button className="h-10 w-10 flex items-center justify-center rounded-2xl bg-blue-900 text-white font-semibold">
                {userData?.username?.[0]?.toUpperCase()}
              </button>

              <div className="flex flex-col leading-tight">
                <h1 className={`text-sm font-medium 
                  ${theme ? "text-white" : "text-gray-800"}`}>
                  {userData?.username?.split(" ")[0]}
                </h1>
                <p className={`text-xs 
                  ${theme ? "text-gray-400" : "text-gray-500"}`}>
                  {userData?.email}
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mt-8 mb-6">
              <Link href="/pages/Dashboard">
                <img src="/I.jpg" alt="logo" className="h-13 w-auto cursor-pointer" />
              </Link>
            </div>

            <div>
              <Link href='/auth/Login'
                className={`p-3 font-semibold rounded-2xl mr-3 transition-colors duration-300 
                  ${theme ? "bg-blue-700 text-white hover:bg-white hover:text-black" 
                          : "bg-blue-600 text-white hover:bg-white hover:text-black"}`}
              >
                Login
              </Link>

              <Link href='/auth/Signup'
                className={`p-3 font-semibold rounded-2xl transition-colors duration-300 
                  ${theme ? "bg-blue-700 text-white hover:bg-white hover:text-black" 
                          : "bg-blue-600 text-white hover:bg-white hover:text-black"}`}
              >
                Signup
              </Link>
            </div>

          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
























