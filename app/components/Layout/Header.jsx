"use client";

import React from 'react';
import Link from 'next/link';
import { useAppContext } from '../../Context/UserContext';


function Header() {
  const { isLogin, userData } = useAppContext();

  return (
    <header
      className={`fixed top-0 ${isLogin ? 'left-64 w-[calc(100%-16rem)]' : 'left-0 w-full'
        } h-16 bg-white border-b border-blue-100 shadow-lg z-50`}
    >
      <nav className="flex items-center justify-between px-4 h-full">
        {/* Logo */}






        {/* Right side buttons */}
        {isLogin ? (
          <>
            <div className="mt-8 mb-6">
              <h1 className="text-xl font-medium text-gray-800 tracking-tight">
                Welcome back, <span className="font-semibold text-blue-600">{userData?.username?.split(" ")[0]}</span>
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Here’s your overview
              </p>
            </div>

            <div className="flex items-center  gap-3 px-2 py-1 rounded-xl hover:bg-gray-100 transition-all duration-200 cursor-pointer">
              {/* Avatar */}
              <button className="h-10 w-10 flex items-center justify-center rounded-2xl bg-blue-900 text-white cursor-pointer font-semibold">
                {userData?.username?.[0].toUpperCase()}
              </button>

              {/* User Details */}
              <div className="flex flex-col leading-tight">
                <h1 className="text-sm font-medium text-gray-800">{userData?.username?.split(" ")[0]}</h1>
                <p className="text-xs text-gray-500">{userData ? userData?.email : "123@gmail.com"}</p>
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
                className="bg-blue-600 text-white p-3 font-semibold rounded-2xl mr-3 hover:bg-white hover:text-black transition-colors duration-400">
                Login
              </Link>

              <Link href='/auth/Signup'
                className="bg-blue-600 text-white p-3 font-semibold rounded-2xl hover:bg-white hover:text-black transition-colors duration-400">
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
