'use client';

import React from 'react';

import { useState } from 'react';
import Newspend from './NewSpend';
import NewIncome from './NewIncome';

export const Balance = ({ balance, saving, monthly }) => {
  // const [newSpend, setNewSpend] = useState({ category: '', amount: 0 });
  const [newSpend, setNewSpend] = useState(false);
  let handleAddSpend = () => {
    setNewSpend(!newSpend);
  };
  const [newIncome, setNewIncome] = useState(false);
  let handleNewIncome = () => {
    setNewIncome(!newIncome);
  };
  return (
    <div className="w-full">
      <div className="bg-gray-500 p-5 rounded-lg m-5">
        <h1 className="font-bold text-center">Balance</h1>
        <ul className="flex flex-col gap-2">
          <li>{`Saldo: ${balance}`}</li>

          <li>{`Ahorro: ${saving}`}</li>
          <li>{`Gasto total mes: ${monthly}`}</li>
        </ul>
        <div className="flex justify-between gap-2 mt-2">
          <button
            className="py-1 bg-blue-400 rounded w-full"
            onClick={handleNewIncome}
          >
            +
          </button>
          <button
            className="py-1 bg-red-400 rounded w-full"
            onClick={handleAddSpend}
          >
            -
          </button>
        </div>
      </div>
      {newSpend && <Newspend />}
      {newIncome && <NewIncome />}
    </div>
  );
};
