import React from 'react'

function Footer() {
  return (
    <footer className=' bottom-0 fixed text-white   bg-black  h-12 w-full ' >
      <div className='flex flex-row  mt-3 justify-between'>
      <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-center sm:text-left">
        <span className="font-bold text-white text-sm sm:text-base">TALKNEST</span>
        <span className="hidden sm:inline text-gray-400 text-xs sm:text-sm">— AI-powered language learning platform</span>
      </div>
       
         <div className="mt-2 sm:mt-0 text-center sm:text-right text-xs sm:text-sm text-gray-400">
        © 2025 TALKNEST. All Rights Reserved.
      </div>
      </div>
    </footer>

  )
}

export default Footer