'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importando iconos de react-icons
import DisplayName from './DisplayName';

interface Props {
  id: string;
}

const Navbar: React.FC<Props> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuDesktop = (
    <ul className="hidden lg:flex gap-6 text-sm lg:text-base font-medium">
      <li className="hover:text-cyan-400 cursor-pointer">Home</li>
      <li className="hover:text-cyan-400 cursor-pointer">Education</li>
      <li className="hover:text-cyan-400 cursor-pointer">Projects</li>
      <li className="hover:text-cyan-400 cursor-pointer">Contact</li>
    </ul>
  );

  const menuBurguer = (
    <div className="lg:hidden px-4 pb-4">
      <ul className="flex flex-col gap-3 text-sm font-medium">
        <li className="hover:text-cyan-400 cursor-pointer">Home</li>
        <li className="hover:text-cyan-400 cursor-pointer">Education</li>
        <li className="hover:text-cyan-400 cursor-pointer">Projects</li>
        <li className="hover:text-cyan-400 cursor-pointer">Contact</li>
        <li className="pt-2 border-t border-gray-700">
          <DisplayName id={id} />
        </li>
      </ul>
    </div>
  );

  const title = (
    <div className="flex justify-center w-full">
      <div
        className={`text-xl font-bold text-4xl ${
          pathname === '/login' ? 'text-white' : 'text-green-500'
        }`}
      >
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
        {/* Botón de menú móvil */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}{' '}
            {/* Mostrar íconos */}
          </button>
        </div>

        {pathname !== '/login' ? (
          <>
            {menuDesktop}
            {menuBurguer}
            {displayName}
          </>
        ) : (
          title
        )}
      </div>
    </nav>
  );
};

export default Navbar;
