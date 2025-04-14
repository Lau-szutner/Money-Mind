'use client';

import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function TransactionsGrap({ transactions }) {
  // Convertimos los datos: parseamos amount a número
  const data = transactions.map((t) => ({
    title: t.title,
    amount: parseFloat(t.amount),
  }));

  console.log(data);

  const total = data.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="bg-bgComponents p-5 rounded-lg m-5 text-2xl flex flex-col gap-4 justify-center items-center">
      <h1 className="font-semibold">Spending Distribution</h1>

      <PieChart
        width={400}
        height={400}
        className="bg-background rounded-lg shadow-custom"
      >
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          dataKey="amount"
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      <ul className="grid grid-cols-2 gap-2 justify-between items-center w-full">
        {data.map((entry, index) => (
          <li
            key={index}
            className="flex justify-between items-center black-buttons"
          >
            <p>{entry.title}</p>
            <p>{((entry.amount / total) * 100).toFixed(2)}%</p>
          </li>
        ))}
      </ul>

      <p className="black-buttons w-full shadow-custom">Analyze</p>
    </div>
  );
}
