import React, { useState } from 'react';
import { Transaction } from './Transaction';

export const TransactionsList = ({
  transactions,
  token,
  refreshTransactions,
}) => {
  const [viewIncomes, setViewIncomes] = useState(false);
  const [viewSpends, setViewSpends] = useState(false);

  const filteredTransactions = transactions.filter((transaction) => {
    if (viewIncomes && !viewSpends) {
      return transaction.type === 'income' || transaction.type === 'ingreso';
    }

    if (viewSpends && !viewIncomes) {
      return transaction.type === 'expense' || transaction.type === 'gasto';
    }

    return true;
  });

  return (
    <div className="w-full">
      <div className="bg-bgComponents p-6 rounded-lg flex flex-col gap-5 justify-center items-center">
        <div className="font-bold border-b-2 w-full grid md:grid-cols-2">
          <h2 className="text-3xl">Transacciones</h2>
          <div className="grid md:grid-cols-2 sm:gap-2 gap-1">
            <button
              className={`text-xl font-light rounded-md px-3 transition-colors mb-2
                ${viewIncomes ? 'bg-green-500 text-white' : 'bg-zinc-700'}`}
              onClick={() => {
                setViewIncomes(!viewIncomes);
                setViewSpends(false);
              }}
            >
              Ingresos
            </button>

            <button
              className={`text-xl font-light rounded-md px-3 transition-colors mb-2 ${
                viewSpends ? 'bg-red-500 text-white' : 'bg-zinc-700'
              }`}
              onClick={() => {
                setViewSpends(!viewSpends);
                setViewIncomes(false);
              }}
            >
              Gastos
            </button>
          </div>
        </div>

        {/* Renderizado de la lista */}
        {filteredTransactions.length === 0 ? (
          <p>No hay transacciones disponibles para este filtro.</p>
        ) : (
          <ul className="w-full flex flex-col gap-2">
            {filteredTransactions.map((transaction) => (
              <Transaction
                key={transaction.id}
                title={transaction.title}
                description={transaction.description}
                category={transaction.category}
                photo={transaction.photo}
                date={transaction.date}
                type={transaction.type}
                amount={transaction.amount}
                token={token}
                id={transaction.id}
                onUpdate={refreshTransactions}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
