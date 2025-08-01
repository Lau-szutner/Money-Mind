'use client';

import React, { ChangeEvent, useState } from 'react';
import NewTransaction from './NewTransaction';

type BalanceProps = {
  income: number;
  spends: number;
  saving: string;
  onDateSelected: (year: number, month: number) => void;
};

export const Balance: React.FC<BalanceProps> = ({
  income,
  saving,
  spends,
  onDateSelected,
}) => {
  const [newSpend, setNewSpend] = useState<boolean>(false);
  const [newIncome, setNewIncome] = useState<boolean>(false);
  const [balanceMonth, setBalanceMonth] = useState<string>(null);

  const handleAddSpend = () => {
    setNewSpend(!newSpend);
    setNewIncome(false);
  };

  const handleNewIncome = () => {
    setNewIncome(!newIncome);
    setNewSpend(false);
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedMonth = e.target.value;
    console.log('Selected Month:', selectedMonth); // Debugging line
    setBalanceMonth(selectedMonth);
    const [year, month] = selectedMonth.split('-');
    onDateSelected(Number(year), Number(month));
  };

  return (
    <div className="bg-bgComponents rounded-lg m-5 text-2xl w-full flex flex-col p-5">
      <h2 className="font-bold text-3xl border-b-2">Wallet</h2>
      <div className="grid w-full h-full gap-5 ">
        <div className="w-full flex justify-between bg-black p-2 rounded-md items-center h-fit p-5 mt-5">
          <p className="">
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

        <div className="w-full flex justify-between border-b border-b-whiteText h-fit">
          <p>Income:</p>
          <p className="text-greenIn font-medium">{income}</p>
        </div>

        <div className="w-full flex justify-between border-b border-b-whiteText h-fit">
          <p>Spends:</p>
          <p className="text-redSpend font-medium">{spends}</p>
        </div>

        <div className="w-full flex justify-between border-b border-b-whiteText h-fit">
          <p>Saving:</p>
          <p className="text-redSpend font-medium">{saving}</p>
        </div>

        <div className="flex justify-between flex-col lg:flex-row gap-5">
          <button
            className="bg-greenIn rounded w-full shadow-custom text-4xl"
            onClick={handleNewIncome}
          >
            +
          </button>
          <button
            className="bg-redSpend rounded w-full text-4xl shadow-custom"
            onClick={handleAddSpend}
          >
            -
          </button>
        </div>
      </div>

      {newIncome && <NewTransaction type="income" title="New income" />}
      {newSpend && <NewTransaction type="expense" title="New spend" />}
    </div>
  );
};
