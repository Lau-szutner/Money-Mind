import React from 'react';
import Link from 'next/link';
function Footer() {
  return (
    <footer className="h-10 bg-gray-600 w-full flex justify-between items-center p-5 flex-col lg:flex-row bottom-0 ">
      <ul className="flex gap-10">
        <li>Transactions</li>
        <li>Home</li>
        <li>Gastos</li>
        <li>Fechas</li>
        <li>Home</li>
        <li>Gastos</li>
        <li>Fechas</li>
        <Link
          href="/creators/studio"
          className="hover:text-cyan-400 cursor-pointer"
        >
          Creators
        </Link>
      </ul>
    </footer>
  );
}

export default Footer;
