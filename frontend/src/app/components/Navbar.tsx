'use client';
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

import { AuthStatus, useAuthContext } from '@/context/AuthProvider';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { user, status, logout, isAuthenticated } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const doLogout = () => {
    logout();
    router.push('/');
    setIsOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const renderDisplayName = () => {
    if (status === AuthStatus.Checking) {
      return (
        <span className="text-gray-400 italic text-sm">
          Cargando usuario...
        </span>
      );
    }

    if (status === AuthStatus.Authenticated && user) {
      return (
        <p className="text-sm font-semibold">
          Hola, <span className="text-greenIn">{user.name}</span> 👋
        </p>
      );
    }

    if (status === AuthStatus.Unauthenticated) {
      return (
        <Link
          href="/login"
          className="inline-block bg-greenIn text-black px-4 py-2 rounded-md text-sm font-bold hover:opacity-90 transition"
          onClick={() => setIsOpen(false)}
        >
          Iniciar Sesión
        </Link>
      );
    }

    if (status === AuthStatus.Error) {
      return (
        <span className="text-red-400 text-sm">
          No se pudo validar la sesión
        </span>
      );
    }

    return null;
  };

  const navLinks = [
    { href: '/user/wallet', label: 'Billetera' },
    { href: '/user/community', label: 'Comunidad' },
    { href: '/user/courses', label: 'Cursos' },
  ];

  return (
    <nav className="bg-bgComponents text-white w-full border-b border-neutral-800 px-4 sm:px-6 lg:px-8 py-3">
      {!isAuthenticated ? (
        <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/" className="flex items-center">
            <Image
              src="/isologo.png"
              alt="MoneyMind"
              width={140}
              height={40}
              priority
              className="w-36 h-auto"
            />
          </Link>
          {renderDisplayName()}
        </div>
      ) : (
        <>
          {/* LAYOUT EN DESKTOP (GRID 3 COLUMNAS) */}
          {/* CAMBIO: Se actualizó de 'md:grid' a 'lg:grid' */}
          <div className="hidden lg:grid grid-cols-[1fr_1fr_33px] items-center gap-4 w-full">
            {/* COLUMNA 1 (IZQUIERDA): Logo + Links */}
            <div className="flex items-center gap-6 lg:gap-8 justify-start">
              <Link href="/user/wallet" className="flex items-center shrink-0">
                <Image
                  src="/isologo.png"
                  alt="MoneyMind"
                  width={140}
                  height={40}
                  priority
                  className="w-32 lg:w-36 h-auto"
                />
              </Link>

              {/* CAMBIO: Se eliminó 'hidden lg:flex' porque el padre ya oculta todo en mobile */}
              <ul className="flex items-center gap-1 font-medium text-sm">
                {navLinks.map((link) => {
                  const isActive = pathname?.startsWith(link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`relative px-4 py-2 transition-all duration-200 ${
                          isActive
                            ? 'text-greenIn border-b-2 border-greenIn'
                            : 'text-gray-300 hover:text-white'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* COLUMNA 2 (CENTRO): Buscador exactamente centrado */}
            <div className="flex justify-center w-full">
              <form
                onSubmit={handleSearch}
                className="relative w-full max-w-md"
              >
                <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  placeholder="Buscar en MoneyMind..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-700 rounded-full text-sm text-white placeholder-gray-400 focus:outline-none focus:border-greenIn focus:ring-1 focus:ring-greenIn transition-all"
                />
              </form>
            </div>

            {/* COLUMNA 3 (DERECHA): Perfil + Futuras herramientas */}
            <div className="flex items-center justify-end gap-4">
              <div className="relative group">
                <button className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-greenIn transition">
                  <img
                    src="/perfil-image.png"
                    alt="Profile"
                    className="w-9 h-9 rounded-full object-cover shrink-0"
                  />
                </button>

                {/* Dropdown del perfil */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-neutral-900 border border-neutral-800 text-white rounded-xl shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-neutral-800">
                    {renderDisplayName()}
                  </div>
                  <ul className="py-1 text-sm">
                    <li>
                      <Link
                        href="/user/profile"
                        className="block px-4 py-2 hover:bg-neutral-800 transition"
                      >
                        Perfil
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/user/settings"
                        className="block px-4 py-2 hover:bg-neutral-800 transition"
                      >
                        Configuración
                      </Link>
                    </li>
                    <li className="border-t border-neutral-800">
                      <button
                        onClick={doLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-neutral-800 text-red-400 font-semibold transition"
                      >
                        Cerrar sesión
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* LAYOUT EN MOBILE (FLEX) */}
          {/* CAMBIO: Se actualizó de 'md:hidden' a 'lg:hidden' */}
          <div className="flex lg:hidden items-center justify-between w-full">
            <Link href="/user/wallet" className="flex items-center shrink-0">
              <Image
                src="/isologo.png"
                alt="MoneyMind"
                width={120}
                height={35}
                className="w-28 h-auto"
              />
            </Link>

            <button
              type="button"
              className="p-2 text-gray-300 hover:text-white"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isOpen}
            >
              {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>

          {/* Menú Mobile Drawer */}
          <div
            className={`fixed top-0 right-0 w-full h-full bg-neutral-900 text-white transform ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            } transition-transform duration-300 ease-in-out z-50 p-6 flex flex-col justify-between`}
          >
            <div>
              <div className="flex justify-between items-center mb-6">
                <Image
                  src="/isologo.png"
                  alt="MoneyMind"
                  width={120}
                  height={35}
                  className="w-28 h-auto"
                />
                <button onClick={() => setIsOpen(false)}>
                  <FaTimes size={24} />
                </button>
              </div>

              {/* Buscador Mobile */}
              <form onSubmit={handleSearch} className="relative w-full mb-6">
                <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  placeholder="Buscar en MoneyMind..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-full text-sm text-white placeholder-gray-400 focus:outline-none focus:border-greenIn"
                />
              </form>

              {/* Navegación Mobile */}
              <ul className="flex flex-col gap-2 font-medium">
                {navLinks.map((link) => {
                  const isActive = pathname?.startsWith(link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`block px-4 py-3 rounded-lg transition ${
                          isActive
                            ? 'bg-greenIn text-black font-semibold'
                            : 'hover:bg-neutral-800 text-gray-300'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Footer del Menú Mobile */}
            <div className="border-t border-neutral-800 pt-4 flex flex-col gap-4">
              <div>{renderDisplayName()}</div>
              {status === AuthStatus.Authenticated && (
                <button
                  onClick={doLogout}
                  className="w-full text-left py-2 text-red-400 font-medium hover:underline"
                >
                  Cerrar sesión
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
