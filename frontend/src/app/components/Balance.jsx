'use client';

import React, { useState } from 'react';
import NewTransaction from './NewTransaction';

export const Balance = ({ balance, saving, monthly, id }) => {
  const [newSpend, setNewSpend] = useState(false);
  const [newIncome, setNewIncome] = useState(false);
  const [balanceDay, setBalanceDay] = useState(null);

  const handleAddSpend = () => {
    setNewSpend(!newSpend);
    setNewIncome(false);
  };

  const handleNewIncome = () => {
    setNewIncome(!newIncome);
    setNewSpend(false);
  };

  const handleDateChange = (e) => {
    setBalanceDay(e.target.value);
  };

  return (
    <div className="w-full">
      <div className="bg-bgComponents p-5 rounded-lg m-5 text-2xl">
        <div className="flex flex-col gap-2 w-full">
          <div className="w-full flex justify-between bg-background p-2 rounded-md items-center">
            <p className="font-bold">
              {balanceDay ? `Balance of ${balanceDay}` : 'April 2025 Balance'}
            </p>

            {/* 📅 con input transparente encima */}
            <div className="relative w-6 h-6">
              <span className="absolute inset-0 z-10 cursor-pointer">📅</span>
              <input
                type="date"
                onChange={handleDateChange}
                className="absolute inset-0 opacity-0 cursor-pointer z-20"
              />
            </div>
          </div>

          <div className="w-full flex justify-between border-b border-b-whiteText">
            <p className="font-bold">Income:</p>
            <p className="text-greenIn">{balance}</p>
          </div>

          <div className="w-full flex justify-between border-b border-b-whiteText">
            <p className="font-bold">Savings:</p>
            <p className="text-[#FFAA00]">{saving}</p>
          </div>

          <div className="w-full flex justify-between border-b border-b-whiteText">
            <p className="font-bold">Spends:</p>
            <p className="text-redSpend">{saving}</p>
          </div>
        </div>

        <div className="flex justify-between gap-2 mt-2">
          <button
            className="py-1 bg-redSpend rounded w-full text-3xl shadow-custom"
            onClick={handleAddSpend}
          >
            -
          </button>
          <button
            className="py-1 bg-greenIn rounded w-full shadow-custom text-3xl"
            onClick={handleNewIncome}
          >
            +
          </button>
        </div>
      </div>

      {newIncome && <NewTransaction type={'income'} title={'New income'} />}
      {newSpend && <NewTransaction type={'expense'} title={'New spend'} />}
    </div>
  );
};
