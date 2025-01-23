import React from 'react';
import { Spend } from './Spend';

export const Spends = ({ spendsList }) => {
  return (
    <div className="bg-black/5 backdrop-blur-md m-5 p-6 w-5/12 rounded-lg flex flex-col gap-5 justify-center items-center">
      <h2 className="text-2xl">Gastos</h2>
      <ul className="w-full">
        <Spend
          title={'Pizza'}
          price={'10.000'}
          category={'Comida'}
          description={'Pizza de muzzarella'}
          date={'12/12/2003'}
        ></Spend>
        {/* 
        {spendsList.map((spend, key) => (
          <li className="flex justify-between w-full" key={spend.id}>
            <span>{spend.title}</span>
            <span>{spend.price}</span>
          </li>
        ))} */}
      </ul>
    </div>
  );
};
