import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importando iconos de react-icons
import DisplayName from './DisplayName';

interface Props {
  id: string;
}

const Navbar: React.FC<Props> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-neutral-900 text-white sticky top-0 z-10 w-full shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Nombre o branding */}
        <div className="text-xl font-bold">Money Mind</div>

        {/* Botón de menú móvil */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}{' '}
            {/* Mostrar íconos */}
          </button>
        </div>

        {/* Menú en desktop */}
        <ul className="hidden lg:flex gap-6 text-sm lg:text-base font-medium">
          <li className="hover:text-cyan-400 cursor-pointer">Home</li>
          <li className="hover:text-cyan-400 cursor-pointer">Education</li>
          <li className="hover:text-cyan-400 cursor-pointer">Projects</li>
          <li className="hover:text-cyan-400 cursor-pointer">Contact</li>
        </ul>

        {/* DisplayName en escritorio */}
        <div className="hidden lg:block">
          <DisplayName id={id} />
        </div>
      </div>

      {/* Menú colapsable en mobile */}
      {isOpen && (
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
      )}
    </nav>
  );
};

export default Navbar;
