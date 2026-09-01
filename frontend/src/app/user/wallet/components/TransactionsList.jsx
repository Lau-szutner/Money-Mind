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
    <>
      <style>{`
        .transaction-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.25) transparent;
        }

        .transaction-scroll::-webkit-scrollbar {
          width: 8px;
        }

        .transaction-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .transaction-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.25);
          border-radius: 999px;
        }

        .transaction-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }
      `}</style>

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

          {filteredTransactions.length === 0 ? (
            <p>No hay transacciones disponibles para este filtro.</p>
          ) : (
            <div className="transaction-scroll w-full max-h-[840px] overflow-y-auto pr-1">
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
            </div>
          )}
        </div>
      </div>
    </>
  );
};
