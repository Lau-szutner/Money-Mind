import React from 'react';

function Footer() {
  return (
    <div className="h-20 glass w-full flex justify-between items-center p-5 flex-col lg:flex-row  fixed bottom-0">
      <ul className="flex  gap-10 ">
        <li>Transsacciones</li>
        <li>Home</li>
        <li>Gastos</li>
        <li>Fechas</li>
      </ul>
    </div>
  );
}

export default Footer;
