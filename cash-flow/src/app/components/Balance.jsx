import React from 'react';

export const Balance = ({ balance, saving, investing }) => {
  return (
    <div className="w-full">
      <div className="bg-gray-500 p-5 rounded-lg m-10">
        <ul>
          <li>{`Saldo: ${balance}`}</li>
          <li>{`Ahorro: ${saving}`}</li>
          <li>{`Invertido: ${investing}`}</li>
        </ul>
        <div className="flex justify-between">
          <button className="py-1 px-10 bg-blue-400 rounded">+</button>
          <button className="py-1 px-10 bg-red-400 rounded">-</button>
        </div>
      </div>
    </div>
  );
};
