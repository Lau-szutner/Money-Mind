'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';
import DisplayName from './DisplayName';

interface Props {
  id: string;
}

const Navbar: React.FC<Props> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuDesktop = (
    <ul className="hidden lg:flex gap-6 text-sm lg:text-base font-medium">
      <li className="hover:text-green-500 cursor-pointer">Home</li>
      <li className="hover:text-green-500 cursor-pointer">Education</li>
      <li className="hover:text-green-500 cursor-pointer">Projects</li>
      <li className="hover:text-green-500 cursor-pointer">Contact</li>
    </ul>
  );

  const menuBurguer = (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-neutral-900 text-white transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="flex justify-between items-center px-4 py-3">
        <div className="text-3xl font-bold">
          <span className="text-green-500">Money</span>Mind
        </div>
        <button onClick={() => setIsOpen(false)}>
          <FaTimes size={24} />
        </button>
      </div>
      <ul className="flex flex-col gap-6 text-sm font-medium px-4">
        <li className="hover:text-green-500 cursor-pointer">Home</li>
        <li className="hover:text-green-500 cursor-pointer">Education</li>
        <li className="hover:text-green-500 cursor-pointer">Projects</li>
        <li className="hover:text-green-500 cursor-pointer">Contact</li>
        <li className="pt-2 border-t border-gray-700">
          <DisplayName id={id} />
        </li>
      </ul>
    </div>
  );

  const title = (
    <div
      className={`flex justify-center ${pathname === '/login' ? 'w-full' : ''}`}
    >
      <div className="text-3xl font-bold h-fit">
        <span className="text-green-500">Money</span>Mind
      </div>
    </div>
  );

  const displayName = (
    <div className="hidden lg:block">
      <DisplayName id={id} />
    </div>
  );

  return (
    <nav className="bg-neutral-900 text-white sticky top-0 z-10 w-full shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {pathname !== '/login' ? (
          <>
            {title}
            {menuDesktop}
            {displayName}
          </>
        ) : (
          title
        )}
        <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      {menuBurguer}
    </nav>
  );
};

export default Navbar;
