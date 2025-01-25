import React from 'react';

export const Balance = ({ balance, saving, investing }) => {
  return (
    <div className="w-full fixed-top">
      <div className="bg-gray-500 p-5 rounded-lg m-5">
        <h1 className="font-bold text-center">Balance</h1>
        <ul>
          <li>{`Saldo: ${balance}`}</li>
          <li>{`Ahorro: ${saving}`}</li>
          <li>{`Invertido: ${investing}`}</li>
        </ul>
        <div className="flex justify-between flex-col gap-2 md:flex-row">
          <button className="py-1 px-10 bg-blue-400 rounded lg:w-full">
            +
          </button>
          <button className="py-1 px-10 bg-red-400 rounded  lg:w-full">
            -
          </button>
        </div>
      </div>
    </div>
  );
};
