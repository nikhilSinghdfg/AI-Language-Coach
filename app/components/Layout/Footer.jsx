import React from 'react';
import { useThemeContext } from "../../Context/ThemeContext";

function Footer() {
  const { theme } = useThemeContext();

  return (
   <footer
      className={`
        fixed bottom-0 left-64 right-0 h-12 w-[calc(100%-16rem)] sm:w-[calc(100%-16rem)] w-full
        border-l border-t shadow-md
        ${theme ? "bg-gray-900 border-gray-700 text-white" : "bg-gray-100 border-gray-300 text-black"}
      `}
    >
      <div className='flex flex-row mt-3 justify-between'>
        <div className={`flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-center sm:text-left`}>
          <span className={`font-bold text-sm sm:text-base ${theme ? "text-white" : "text-black"}`}>
            TALKNEST
          </span>
          <span className={`hidden sm:inline text-xs sm:text-sm ${theme ? "text-gray-300" : "text-gray-500"}`}>
            — AI-powered language learning platform
          </span>
        </div>

        <div className={`mt-2 sm:mt-0 text-center sm:text-right text-xs sm:text-sm ${theme ? "text-gray-300" : "text-gray-500"}`}>
          © 2025 TALKNEST. All Rights Reserved.
        </div>
      </div>
    </footer>

  );
}

export default Footer;
