'use client';

import React, { useState } from 'react';
import NewTransaction from './NewTransaction';

export const Balance = ({ income, saving, spends, id, onDateSelected }) => {
  const [newSpend, setNewSpend] = useState(false);
  const [newIncome, setNewIncome] = useState(false);
  const [balanceMonth, setBalanceMonth] = useState(null);

  const handleAddSpend = () => {
    setNewSpend(!newSpend);
    setNewIncome(false);
  };

  const handleNewIncome = () => {
    setNewIncome(!newIncome);
    setNewSpend(false);
  };

  const handleDateChange = (e) => {
    const selectedMonth = e.target.value;
    console.log('Selected Month:', selectedMonth); // Debugging line
    setBalanceMonth(selectedMonth);
    const [year, month] = selectedMonth.split('-');
    onDateSelected(year, month);
  };

  return (
    <div className="w-full">
      <div className="bg-bgComponents p-5 rounded-lg m-5 text-2xl">
        <div className="flex flex-col gap-2 w-full">
          <div className="w-full flex justify-between bg-background p-2 rounded-md items-center">
            <p className="font-bold">
              {balanceMonth
                ? `Balance of ${balanceMonth}`
                : 'Please select a month'}
            </p>

            {/* 📅 con input transparente encima */}
            <div className="relative w-6 h-6">
              <label
                htmlFor="monthPicker"
                className="absolute inset-0 z-10 cursor-pointer"
              >
                📅
              </label>
              <input
                id="monthPicker"
                type="month"
                onChange={handleDateChange}
                className="absolute inset-0 opacity-0 cursor-pointer z-20"
              />
            </div>
          </div>

          <div className="w-full flex justify-between border-b border-b-whiteText">
            <p className="font-bold">Income:</p>
            <p className="text-greenIn font-medium">{income}</p>
          </div>

          <div className="w-full flex justify-between border-b border-b-whiteText">
            <p className="font-bold">Spends:</p>
            <p className="text-redSpend font-medium">{spends}</p>
          </div>
        </div>

        <div className="flex justify-between gap-2 mt-2 flex-col lg:flex-row">
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

      {newIncome && <NewTransaction type="income" title="New income" />}
      {newSpend && <NewTransaction type="expense" title="New spend" />}
    </div>
  );
};
