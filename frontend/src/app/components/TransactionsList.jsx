import React from 'react';
import { Transaction } from './Transaction';

export const TransactionsList = ({
  transactions,
  token,
  refreshTransactions,
}) => {
  return (
    <div className="w-full">
      <div className="bg-white/15 backdrop-blur-md m-5 p-6 rounded-lg flex flex-col gap-5 justify-center items-center">
        <h2 className="text-2xl font-bold">Transactions List</h2>
        {transactions.length === 0 ? (
          <p>No transaction avalible, do the first one!</p>
        ) : (
          <ul className="w-full flex flex-col gap-2">
            {transactions.map((transactions) => {
              return (
                <Transaction
                  key={transactions.id}
                  title={transactions.title}
                  description={transactions.description}
                  category={transactions.category}
                  photo={transactions.photo}
                  date={transactions.date}
                  type={transactions.type}
                  amount={transactions.amount}
                  token={token}
                  id={transactions.id}
                  onUpdate={refreshTransactions} //
                />
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
