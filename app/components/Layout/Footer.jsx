import React from 'react';
import { useAppContext } from '../../Context/UserContext';
import { useThemeContext } from '../../Context/ThemeContext';
function Footer() {
    const { isLogin, userData, loading } = useAppContext();
    const { theme } = useThemeContext();


    if (loading) return;

  return (
   <footer
      className={`
        fixed bottom-0  ${isLogin?"left-64  ":"left-0 right-0 px-3 pr-5 w-screen"} right-0 h-12   
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
