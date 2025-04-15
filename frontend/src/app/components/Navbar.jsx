import Link from 'next/link';
import React from 'react';
import DisplayName from './DisplayName';

export const Navbar = ({ id }) => {
  return (
    <nav className="h-fit bg-neutral-900 flex justify-between items-center p-3 flex-col lg:flex-row sticky top-0 w-full z-10">
      <div className="flex justify-between items-center w-full px-4">
        <div className="flex flex-col justify-between w-8 h-6 cursor-pointer">
          <div className="w-full h-1 bg-white mb-1"></div>
          <div className="w-full h-1 bg-white mb-1"></div>
          <div className="w-full h-1 bg-white mb-1"></div>
        </div>

        <div className="text-white">
          <DisplayName id={id}></DisplayName>
        </div>
      </div>
    </nav>
  );
};
