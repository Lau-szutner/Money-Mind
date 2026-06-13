'use client';
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

import { useAuthContext } from '@/context/AuthProvider';

interface Props {
  id: string;
}

const Navbar: React.FC<Props> = ({ id }) => {
  const router = useRouter();
  const pathname = usePathname();

  // Extraemos logout para corregir la función de salida
  const { user, status, logout } = useAuthContext();

  // SOLUCIÓN: Cambiado a false para que el menú inicie cerrado en móviles
  const [isOpen, setIsOpen] = useState(false);

  // SOLUCIÓN: Ahora sí ejecuta la limpieza global del estado
  const doLogout = () => {
    logout();
    router.push(`/`);
    setIsOpen(false);
  };

  // SOLUCIÓN: Modificado para que retorne JSX directamente de forma condicional y limpia
  const renderDisplayName = () => {
    if (status === 'checking') {
      return (
        <span className="text-gray-400 italic text-sm">
          Cargando usuario...
        </span>
      );
    }

    if (status === 'authenticated' && user) {
      return (
        <p className="text-sm font-semibold">
          Hola, <span className="text-green-400">{user.name}</span> 👋
        </p>
      );
    }

    if (status === 'unauthenticated') {
      return (
        <Link
          href="/login"
          className="inline-block bg-green-500 text-black px-4 py-2 rounded-md text-sm font-bold hover:bg-green-600 transition"
          onClick={() => setIsOpen(false)}
        >
          Iniciar Sesión
        </Link>
      );
    }

    return null;
  };

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
      className={`fixed top-0 right-0 w-full h-full bg-neutral-900 text-white transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out z-50 px-6 pt-6`}
    >
      <div className="flex justify-end px-4 py-3">
        <button onClick={() => setIsOpen(false)}>
          <FaTimes size={24} />
        </button>
      </div>
      <ul className="flex flex-col gap-6 text-sm font-medium px-4 items-end text-right">
        <li>
          <Link
            href="/user/wallet"
            className="cursor-pointer hover:text-green-500"
            onClick={() => setIsOpen(false)}
          >
            Billetera
          </Link>
        </li>
        <li>
          <Link
            href="/user/community"
            className="cursor-pointer hover:text-green-500"
            onClick={() => setIsOpen(false)}
          >
            Comunidad
          </Link>
        </li>
        <li>
          <Link
            href="/user/education"
            className="cursor-pointer hover:text-green-500"
            onClick={() => setIsOpen(false)}
          >
            Educación
          </Link>
        </li>

        {/* SOLUCIÓN: Se ejecuta como función y hereda una celda independiente con borde */}
        <li className="border-t border-gray-700 w-full text-right pt-4">
          {renderDisplayName()}
        </li>

        {/* El botón de cerrar sesión solo debería verse si está autenticado */}
        {status === 'authenticated' && (
          <li>
            <p className="cursor-pointer hover:text-red-500" onClick={doLogout}>
              Cerrar sesión
            </p>
          </li>
        )}
      </ul>
    </div>
  );

  const title = (
    <div
      className={`bg-bgComponents Header flex justify-center ${pathname === '/login' || pathname === '/' ? 'w-full' : ''}`}
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
          </div>
        </Link>
      </div>
    </div>
  );

  const User = (
    <div className="hidden lg:block relative group">
      <button className="flex items-center gap-2">
        <img
          src="/perfil-image.png"
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
      </button>

      <div className="absolute right-0 w-48 bg-white text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300 z-20">
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
            <button
              onClick={doLogout}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 font-semibold"
            >
              Cerrar sesión
            </button>
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <nav className="bg-bgComponents text-white w-full h-fit px-10 py-3">
      <div className="w-full flex items-center justify-between">
        {pathname === '/login' || pathname === '/' ? (
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
