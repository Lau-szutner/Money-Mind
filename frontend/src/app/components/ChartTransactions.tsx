'use client';

import React from 'react';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

type Transaction = {
  id: string;
  type: 'income' | 'expense';
  amount: string;
  title: string;
  [key: string]: any;
};

interface ChartProps {
  transactions: Transaction[];
}

const ChartTransactions: React.FC<ChartProps> = ({ transactions }) => {
  const spends = transactions.map((t) => ({
    title: t.title,
    amount: parseFloat(t.amount),
  }));

  console.log(spends);

  const data = {
    labels: spends.map((t) => t.title),
    datasets: [
      {
        label: 'Gastos',
        data: spends.map((t) => t.amount),
        backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div>
      <div className="bg-bgComponents p-10 rounded-lg  text-2xl flex flex-col items-center w-full">
        <h1 className="font-bold text-3xl border-b-2 w-full top-0">Analytic</h1>
        <h2 className="font-semibold text-xl">Total spends month: </h2>

        <div className="w-70 h-70">
          <Chart type="doughnut" data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ChartTransactions;
