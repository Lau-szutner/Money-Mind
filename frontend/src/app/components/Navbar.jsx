import Link from 'next/link';
import React from 'react';
import DisplayName from './DisplayName';

export const Navbar = () => {
  return (
    <nav className="h-15 bg-neutral-900 flex justify-between items-center p-3 flex-col lg:flex-row sticky top-0 w-full z-10">
      <div className="flex justify-between items-center w-full px-4">
        <div className="flex flex-col justify-between w-8 h-6 cursor-pointer">
          <div className="w-full h-1 bg-white mb-1"></div>
          <div className="w-full h-1 bg-white mb-1"></div>
          <div className="w-full h-1 bg-white mb-1"></div>
        </div>

        <div className="text-white">
          <DisplayName></DisplayName>
        </div>
      </div>

      {/* <ul className="flex flex-col lg:flex-row gap-10 invisible lg:visible">
        Cada elemento se vuelve invisible en pantallas pequeñas
        <li className="invisible lg:visible">
          <Link href="/Gastos" className="btn">
            Gastos
          </Link>
        </li>
        <li className="btn invisible lg:visible">Analisis</li>
        <li className="btn invisible lg:visible">Planes</li>
        <li className="btn invisible lg:visible">Educacion</li>
      </ul> */}
    </nav>
  );
};
