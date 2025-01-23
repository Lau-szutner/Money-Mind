import Link from 'next/link';
import React from 'react';

export const Navbar = () => {
  return (
    <div className="h-20 glass flex justify-between items-center p-5">
      <h1>Cash Flow</h1>

      <ul className="flex flex-col lg:flex-row gap-10">
        <li>
          <Link href="/Gastos" className="btn">
            Gastos
          </Link>
        </li>
        <li className="btn">Analisis</li>
        <li className="btn">Planes</li>
        <li className="btn">Educacion</li>
      </ul>
    </div>
  );
};
