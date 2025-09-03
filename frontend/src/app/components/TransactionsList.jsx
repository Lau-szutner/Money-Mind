import React from 'react';
import { Transaction } from './Transaction';

export const TransactionsList = ({
  transactions,
  token,
  refreshTransactions,
}) => {
  return (
    <div className="w-full">
      <div className="bg-bgComponents  p-6 rounded-lg flex flex-col gap-5 justify-center items-center">
        <h2 className="font-bold text-3xl border-b-2 w-full top-0">Activity</h2>
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
