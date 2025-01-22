import React from "react";

export const Spends = ({ spendsList }) => {

  return (
    <div className="bg-gray-500 m-10 p-7 w-5/12 rounded-lg flex flex-col gap-5 justify-center items-center">
      <h2>Gastos</h2>
      <ul className="w-full">
        <li className="flex justify-between w-full">
          <span>Comida</span>
          <span>$10.000</span>
        </li>
        <li className="flex justify-between w-full">
          <span>Transporte</span>
          <span>$10.000</span>
        </li>
        <li className="flex justify-between w-full">
          <span>Ropa</span>
          <span>$10.000</span>
        </li>

        {spendsList.map((spend, key) => (
          <li className="flex justify-between w-full" key={spend.id}>
            <span>{spend.title}</span>
            <span>{spend.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
