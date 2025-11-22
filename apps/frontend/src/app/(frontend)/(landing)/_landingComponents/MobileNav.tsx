'use client'
import React, { useState } from 'react'

const MobileNav = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative  lg:hidden ml-2">
      <button type="button" className="" onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>
        {!expanded ? (
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        ) : (
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        )}
      </button>
      {expanded && (
        <nav className="absolute top-10 right-20  bg-black shadow-lg lg:hidden z-[9999]">
          <div className="px-4 py-4">
            <div className="flex flex-col gap-y-4">
              <a href="#" title="" className="text-base text-white transition-all duration-200 hover:text-opacity-80">Features</a>
              <a href="#" title="" className="text-base text-white transition-all duration-200 hover:text-opacity-80">Solutions</a>
              <a href="#" title="" className="text-base text-white transition-all duration-200 hover:text-opacity-80">Resources</a>
              <a href="#" title="" className="text-base text-white transition-all duration-200 hover:text-opacity-80">Pricing</a>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

export default MobileNav;
