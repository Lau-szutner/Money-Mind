import React from 'react';
import Link from 'next/link';

function Footer() {
  return (
    <div className="h-10 bg-gray-600 w-full flex justify-between items-center p-5 flex-col lg:flex-row bottom-0 ">
      <ul className="flex gap-10">
        <Link href="/transactions" className="btn">
          Transacciones
        </Link>
        <li>Home</li>
        <li>Gastos</li>
        <li>Fechas</li>
        <li>Home</li>
        <li>Gastos</li>
        <li>Fechas</li>
      </ul>
    </div>
  );
}

export default Footer;
