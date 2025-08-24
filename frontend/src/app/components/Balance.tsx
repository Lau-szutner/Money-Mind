'use client';

import React, { ChangeEvent, useState, useEffect } from 'react';
import NewTransaction from './NewTransaction';

type BalanceProps = {
  income: number;
  spends: number;
  saving: string;
  onDateSelected: (year: number, month: number) => void;
  onTransactionAdded: () => void;
  month: string; // recibe el mes en formato "YYYY-MM"
};

export const Balance: React.FC<BalanceProps> = ({
  income,
  saving,
  spends,
  onDateSelected,
  onTransactionAdded,
  month,
}) => {
  const [newSpend, setNewSpend] = useState<boolean>(false);
  const [newIncome, setNewIncome] = useState<boolean>(false);
  const [balanceMonth, setBalanceMonth] = useState<string>(null);
  const [monthOpen, setMonthOpen] = useState<boolean>(false);

  // Sincronizar balanceMonth con prop month para mostrar el texto correctamente
  useEffect(() => {
    setBalanceMonth(month);
  }, [month]);

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
    setBalanceMonth(selectedMonth);
    const [year, month] = selectedMonth.split('-');
    onDateSelected(Number(year), Number(month));
  };

  const LightIcon = (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 7.5C3 5.01472 5.01472 3 7.5 3H24.5C26.9853 3 29 5.01472 29 7.5V24.5C29 26.9853 26.9853 29 24.5 29H7.5C5.01472 29 3 26.9853 3 24.5V7.5ZM5 11V24.5C5 25.8807 6.11929 27 7.5 27H24.5C25.8807 27 27 25.8807 27 24.5V11H5ZM27 9V7.5C27 6.11929 25.8807 5 24.5 5H7.5C6.11929 5 5 6.11929 5 7.5V9H27ZM10.5 18C11.3284 18 12 17.3284 12 16.5C12 15.6716 11.3284 15 10.5 15C9.67157 15 9 15.6716 9 16.5C9 17.3284 9.67157 18 10.5 18ZM12 21.5C12 22.3284 11.3284 23 10.5 23C9.67157 23 9 22.3284 9 21.5C9 20.6716 9.67157 20 10.5 20C11.3284 20 12 20.6716 12 21.5ZM16 23C16.8284 23 17.5 22.3284 17.5 21.5C17.5 20.6716 16.8284 20 16 20C15.1716 20 14.5 20.6716 14.5 21.5C14.5 22.3284 15.1716 23 16 23ZM17.5 16.5C17.5 17.3284 16.8284 18 16 18C15.1716 18 14.5 17.3284 14.5 16.5C14.5 15.6716 15.1716 15 16 15C16.8284 15 17.5 15.6716 17.5 16.5ZM21.5 18C22.3284 18 23 17.3284 23 16.5C23 15.6716 22.3284 15 21.5 15C20.6716 15 20 15.6716 20 16.5C20 17.3284 20.6716 18 21.5 18Z"
        fill="#ffffff"
      />
    </svg>
  );

  const fullIcon = (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 7.5C3 5.01472 5.01472 3 7.5 3H24.5C26.9853 3 29 5.01472 29 7.5V9H3V7.5ZM3 11V24.5C3 26.9853 5.01472 29 7.5 29H24.5C26.9853 29 29 26.9853 29 24.5V11H3ZM10.5 18C9.67157 18 9 17.3284 9 16.5C9 15.6716 9.67157 15 10.5 15C11.3284 15 12 15.6716 12 16.5C12 17.3284 11.3284 18 10.5 18ZM12 21.5C12 22.3284 11.3284 23 10.5 23C9.67157 23 9 22.3284 9 21.5C9 20.6716 9.67157 20 10.5 20C11.3284 20 12 20.6716 12 21.5ZM16 23C15.1716 23 14.5 22.3284 14.5 21.5C14.5 20.6716 15.1716 20 16 20C16.8284 20 17.5 20.6716 17.5 21.5C17.5 22.3284 16.8284 23 16 23ZM17.5 16.5C17.5 17.3284 16.8284 18 16 18C15.1716 18 14.5 17.3284 14.5 16.5C14.5 15.6716 15.1716 15 16 15C16.8284 15 17.5 15.6716 17.5 16.5ZM21.5 18C20.6716 18 20 17.3284 20 16.5C20 15.6716 20.6716 15 21.5 15C22.3284 15 23 15.6716 23 16.5C23 17.3284 22.3284 18 21.5 18Z"
        fill="#ffffff"
      />
    </svg>
  );

  return (
    <div className="bg-bgComponents rounded-lg text-2xl w-full flex flex-col p-5">
      <h2 className="font-bold text-3xl border-b-2">Wallet</h2>
      <div className="grid w-full h-full gap-5 ">
        <div className="w-full flex justify-between bg-black rounded-md items-center h-fit p-5 mt-5">
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
              {monthOpen ? fullIcon : LightIcon}
            </label>
            <input
              id="monthPicker"
              type="month"
              onChange={handleDateChange}
              className="absolute inset-0 opacity-0 cursor-pointer z-20"
              value={month || ''}
              onClick={() => setMonthOpen(!monthOpen)}
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

      {newIncome && (
        <NewTransaction
          type="income"
          title="New income"
          onTransactionAdded={onTransactionAdded}
        />
      )}
      {newSpend && (
        <NewTransaction
          type="expense"
          title="New spend"
          onTransactionAdded={onTransactionAdded}
        />
      )}
    </div>
  );
};
