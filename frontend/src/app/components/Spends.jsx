import React from 'react';
import { Spend } from './Spend';

export const Spends = ({ spendsList }) => {
  return (
    <div className="w-full">
      <div className="bg-white/15 backdrop-blur-md m-5 p-6 rounded-lg flex flex-col gap-5 justify-center items-center">
        <h2 className="text-2xl">Gastos</h2>
        <ul className="w-full flex flex-col gap-2">
          {spendsList.map((spend) => {
            return (
              <Spend
                key={spend.id}
                title={spend.title}
                price={spend.price}
                category={spend.category}
                description={spend.description}
                date={spend.date}
              ></Spend>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
