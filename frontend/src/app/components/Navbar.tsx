'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';
import DisplayName from './DisplayName';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  id: string;
}

const Navbar: React.FC<Props> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuDesktop = (
    <ul className="hidden lg:flex gap-6 text-sm lg:text-base font-medium">
      <li>
        <Link
          href="/user/wallet"
          className="hover:bg-greenIn cursor-pointer px-8 py-3 rounded-md transition duration-150"
        >
          Wallet
        </Link>
      </li>
      <li>
        <Link
          href="/user/community"
          className="hover:bg-greenIn cursor-pointer px-3 py-3 rounded-md transition duration-150"
        >
          Community
        </Link>
      </li>
      <li>
        <Link
          href="/user/education"
          className="hover:bg-greenIn cursor-pointer px-3 py-3 rounded-md transition duration-150"
        >
          Education
        </Link>
      </li>
    </ul>
  );

  const menuBurguer = (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-neutral-900 text-white transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="flex justify-between items-center px-4 py-3">
        <button onClick={() => setIsOpen(false)}>
          <FaTimes size={24} />
        </button>
      </div>
      <ul className="flex flex-col gap-6 text-sm font-medium px-4">
        <li className="hover:text-green-500 cursor-pointer">Home</li>
        <li className="hover:text-green-500 cursor-pointer">Education</li>
        <li className="hover:text-green-500 cursor-pointer">Wallet</li>
        <li className="hover:text-green-500 cursor-pointer">Contact</li>
        <li className="pt-2 border-t border-gray-700">
          <DisplayName id={id} />
        </li>
      </ul>
    </div>
  );
  const title = (
    <div
      className={`bg-bgComponents Header flex justify-center ${
        pathname === '/login' || pathname === '/' ? 'w-full' : ''
      }`}
    >
      <div className="text-3xl font-bold text-center">
        <Link href="/" className="hover:text-cyan-400 cursor-pointer">
          <div className="flex items-center">
            <Image
              src="/isologo.png"
              alt="logo"
              width={250}
              height={250}
              priority
            />

            {/* <span className="text-green-500">Money</span>Mind */}
          </div>
        </Link>
      </div>
    </div>
  );
  const User = (
    <div className="hidden lg:block relative group ">
      <button className="flex items-center gap-2">
        <DisplayName id={id} />
        <img
          src="/perfil-image.png"
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
      </button>

      {/* Submenú visible al hacer hover */}
      <div className="absolute right-0 w-full bg-foreground text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-500 z-20">
        <ul className="py-2 text-sm w-full">
          <li>
            <Link
              href="/user/profile"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Perfil
            </Link>
          </li>
          <li>
            <Link
              href="/user/settings"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Configuración
            </Link>
          </li>
          <li>
            <Link href="/logout" className="block px-4 py-2 hover:bg-gray-100">
              Cerrar sesión
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <nav className="bg-bgComponents text-white w-full h-fit px-10">
      <div className="w-full flex items-center justify-between">
        {pathname == '/login' || pathname === '/' ? (
          title
        ) : (
          <>
            {title}
            {menuDesktop}
            {User}
          </>
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
