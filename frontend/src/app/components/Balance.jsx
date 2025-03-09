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
      <div className="bg-bgComponents p-5 rounded-lg m-5 text-2xl">
        <div className="flex flex-col gap-2 width-full">
          <div className="width-full flex justify-between  border-b border-b-whiteText">
            <p className="font-bold ">Income:</p>
            <p className="text-greenIn">{balance}</p>
          </div>

          <div className="width-full flex justify-between  border-b border-b-whiteText">
            <p className="font-bold ">Income:</p>
            <p className="text-[#FFAA00]">{saving}</p>
          </div>

          <div className="width-full flex justify-between  border-b border-b-whiteText">
            <p className="font-bold ">Income:</p>
            <p className="text-redSpend">{saving}</p>
          </div>
          {/* <li>{`Ahorro: ${saving}`}</li>
          <li>{`Gasto total mes: ${monthly}`}</li> */}
        </div>
        <div className="flex justify-between gap-2 mt-2">
          <button
            className="py-1 bg-redSpend rounded w-full shadow-custom "
            onClick={handleNewIncome}
          >
            -
          </button>
          <button
            className="py-1 bg-greenIn rounded w-full text-3xl shadow-custom "
            onClick={handleAddSpend}
          >
            +
          </button>
        </div>
      </div>
      {newSpend && <Newspend />}
      {newIncome && <NewIncome />}
    </div>
  );
};
