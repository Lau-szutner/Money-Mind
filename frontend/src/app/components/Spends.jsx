import React from 'react';
import { Spend } from './Spend';

export const Spends = ({ spendsList, token }) => {
  if (!spendsList) {
    return <div>Loading spends...</div>;
  }

  if (spendsList.length === 0) {
    return <div>No spends available</div>;
  }

  return (
    <div className="w-full">
      <div className="bg-white/15 backdrop-blur-md m-5 p-6 rounded-lg flex flex-col gap-5 justify-center items-center">
        <h2 className="text-2xl">Spends</h2>
        <ul className="w-full flex flex-col gap-2">
          {spendsList.map((spend) => {
            return (
              <Spend
                key={spend.id_spend}
                title={spend.title}
                amount={spend.amount}
                category={spend.category}
                description={spend.description}
                date={spend.date}
                token={token}
                id={spend.id_spend}
              />
            );
          })}
          {/* <p className="w-4/12">{`token: ${token}`}</p> */}
        </ul>
      </div>
    </div>
  );
};
