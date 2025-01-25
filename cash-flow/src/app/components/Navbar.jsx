import Link from 'next/link';
import React from 'react';

export const Navbar = () => {
  return (
    <div className="h-20 glass flex justify-between items-center p-5 flex-col lg:flex-row">
      <h1>Cash Flow</h1>

      <ul className="flex flex-col lg:flex-row gap-10">
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
    </div>
  );
};
