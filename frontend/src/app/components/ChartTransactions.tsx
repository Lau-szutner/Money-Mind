'use client';

import React from 'react';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

type Transaction = {
  id: number;
  title: string;
  type: string;
  amount: string;
  description: string;
  category: string;
  photo: string | null;
  createdAt: string;
  date: string;
  fk_user_id: number;
  updatedAt: string;
};

interface ChartProps {
  transactions: Transaction[];
}

const ChartTransactions: React.FC<ChartProps> = ({ transactions }) => {
  const spends: Transaction[] = [];
  const incomes: Transaction[] = [];

  let totalSpends = 0;
  let totalIncomes = 0;

  transactions.forEach((t) => {
    const amount = Number(t.amount);
    if (t.type === 'expense') {
      spends.push(t);
      totalSpends += amount;
    } else if (t.type === 'income') {
      incomes.push(t);
      totalIncomes += amount;
    }
  });

  const data = {
    labels: spends.map((t) => t.category),
    datasets: [
      {
        label: 'Gastos',
        data: spends.map((t) => Number(t.amount)),
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
      <div className="bg-bgComponents p-10 rounded-lg text-2xl flex flex-col items-center w-full">
        <h1 className="font-bold text-3xl border-b-2 w-full top-0">Analytic</h1>

        <div className="self-start p-5 pl-0">
          <p className="font-light text-xl">
            Total spends month:
            <span className="font-semibold"> {totalSpends}</span>
          </p>

          <p className="font-light text-xl">
            Money left:
            <span className="font-semibold"> {totalIncomes - totalSpends}</span>
          </p>
        </div>
        <div className="w-70 h-70">
          <Chart type="doughnut" data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ChartTransactions;
