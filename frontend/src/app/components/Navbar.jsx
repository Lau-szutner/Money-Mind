import Link from 'next/link';
import React from 'react';

export const Navbar = () => {
  return (
    <nav className="h-15 bg-gray-600 flex justify-between items-center p-3 flex-col lg:flex-row sticky top-0 w-full z-10">
      <h1>Money Mind</h1>

      <ul className="flex flex-col lg:flex-row gap-10 invisible lg:visible">
        {/* Cada elemento se vuelve invisible en pantallas pequeñas */}
        <li className="invisible lg:visible">
          <Link href="/Gastos" className="btn">
            Gastos
          </Link>
        </li>
        <li className="btn invisible lg:visible">Analisis</li>
        <li className="btn invisible lg:visible">Planes</li>
        <li className="btn invisible lg:visible">Educacion</li>
      </ul>
    </nav>
  );
};
