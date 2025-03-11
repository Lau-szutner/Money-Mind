import React from 'react';

export default function GraphicExpenses() {
  return (
    <div className="bg-bgComponents p-5 rounded-lg m-5 text-2xl flex flex-col gap-2 justify-center items-center text-2xl">
      <h1 className="font-semibold">Spends</h1>
      <div></div>
      <ul className="grid grid-cols-2 gap-2 justify-between items-center w-full">
        <li className="black-buttons shadow-custom widht-full">Food: 40%</li>
        <li className="black-buttons shadow-custom">Food: 40%</li>
        <li className="black-buttons shadow-custom">Food: 40%</li>
        <li className="black-buttons shadow-custom">Food: 40%</li>
      </ul>
      <p className="black-buttons w-full shadow-custom">Analyze</p>
    </div>
  );
}
