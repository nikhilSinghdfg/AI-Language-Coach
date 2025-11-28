"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaHome } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineMessage } from "react-icons/md";
import { FaRobot } from "react-icons/fa6";
import { FaChartBar } from "react-icons/fa";


function SideBar() {
  return (
    <>

      <div className={`fixed  top-0 left-0 h-[93vh]  border-b  w-64 bg-gray-50  z-50  }`} >

        <nav className='flex flex-col gap-5 justify-around '>


          <div className='flex items-center h-16 border-b border-blue-100 justify-center'>
            <Link href="/pages/Dashboard">
              <img src="/I.jpg" alt="logo" className="h-13 w-auto cursor-pointer" />
            </Link>
          </div>

          <div className="flex flex-col gap-6 pt-5 pl-4 ">

            <div className=' h-10 rounded-2xl hover:bg-gray-200 transition-all duration-200 cursor-pointer flex  items-center '>
              <Link href="/pages/ChatHistory" className="font-semibold text-gray-900 hover:text-blue-500 transition-colors duration-200 flex flex-row items-center gap-2">
                <MdOutlineMessage /> ChatHistory
              </Link>
            </div>

            <div className=' h-12 rounded-2xl hover:bg-gray-200 transition-all duration-200 cursor-pointer flex  items-center '>
              <Link href="/pages/Conversation" className="font-semibold text-gray-900 hover:text-blue-500 transition-colors duration-200 flex flex-row items-center gap-2">
                <FaRobot /> practice
              </Link>
            </div>

            <div className=' h-12  rounded-2xl hover:bg-gray-200 transition-all duration-200 cursor-pointer flex  items-center '>
              <Link href="/pages/Dashboard" className="font-semibold text-gray-900 hover:text-blue-500 transition-colors duration-200 flex flex-row items-center gap-2">
                <FaHome /> Dashboard
              </Link>
            </div>

            <div className=' h-12 rounded-2xl hover:bg-gray-200 transition-all duration-200 cursor-pointer flex  items-center '>
              <Link href="/pages/Report" className="font-semibold text-gray-900 hover:text-blue-500 transition-colors duration-200 flex flex-row items-center gap-2">
                <FaChartBar /> Insights
              </Link>

            </div>

            <div className=' h-12 rounded-2xl hover:bg-gray-200 transition-all duration-200 cursor-pointer flex  items-center '>
              <Link href="/pages/Setting" className="font-semibold text-gray-900 hover:text-blue-500 transition-colors duration-200 flex flex-row items-center gap-2">
                <IoMdSettings /> Setting
              </Link>
            </div>

          </div>


          <div className='mt-55 ml-3 h-12 pl-2 rounded-2xl hover:bg-gray-200 transition-all duration-200 cursor-pointer flex  items-center '>
            <Link href="/pages/Logout" className="font-semibold text-gray-900 hover:text-blue-500 transition-colors duration-200 flex flex-row items-center gap-2">
              <FiLogOut /> Logout
            </Link>
          </div>



        </nav>
      </div>
    </>
  );
}

export default SideBar;
