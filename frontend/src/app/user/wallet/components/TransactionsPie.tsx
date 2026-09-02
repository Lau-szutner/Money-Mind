'use client';
import React from 'react';
import { formatNumber } from '@/app/utils/formatters';
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Sector,
  Tooltip,
  Cell,
  SectorProps,
} from 'recharts';

// Type transaction
type Transaction = {
  id: string;
  type: 'income' | 'expense';
  amount: string;
  title: string;
  [key: string]: any;
};

// type main componente, receiving transaction array as prop
type TransactionsPieProps = {
  transactions: Transaction[];
  totalIncome: number;
};

type Coordinate = {
  x: number;
  y: number;
};

type PieSectorData = {
  percent?: number;
  name?: string | number;
  midAngle?: number;
  middleRadius?: number;
  tooltipPosition?: Coordinate;
  value?: number;
  paddingAngle?: number;
  dataKey?: string | number | ((obj: any) => any);
  payload?: any;
};

type PieSectorDataItem = React.SVGProps<SVGPathElement> &
  Partial<SectorProps> &
  PieSectorData;

const colorByCategory: Record<string, string> = {
  Salario: '#22C55E',
  Supermercado: '#10B981',
  Entretenimiento: '#3B82F6',
  Freelance: '#8B5CF6',
  Salud: '#EC4899',
  Libros: '#F59E0B',
  Deportes: '#14B8A6',
  Tecnología: '#06B6D4',
  Impuestos: '#EF4444',
  Comida: '#F97316',
  Bono: '#84CC16',
};

const getCategoryColor = (category: string) => {
  const normalizedCategory = category?.trim();
  if (!normalizedCategory) return '#7C7C7C';

  const exactMatch = colorByCategory[normalizedCategory];
  if (exactMatch) return exactMatch;

  const normalizedKey = Object.keys(colorByCategory).find(
    (key) => key.toLowerCase() === normalizedCategory.toLowerCase(),
  );

  return normalizedKey ? colorByCategory[normalizedKey] : '#7C7C7C';
};

const renderActiveShape = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  percent,
  value,
}: PieSectorDataItem) => {
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * (midAngle ?? 1));
  const cos = Math.cos(-RADIAN * (midAngle ?? 1));
  const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;
  const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin;
  const mx = (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos;
  const my = (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.category}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={(outerRadius ?? 0) + 6}
        outerRadius={(outerRadius ?? 0) + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >
        {/* {payload.name} */}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${((percent ?? 1) * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export const TransactionsPie = ({
  transactions,
  totalIncome,
}: TransactionsPieProps) => {
  // group transactons by name and value, used to transactionsData for the pieChart
  // this code takes all the transactions and reduce it to get the total of each one

  const transactionsData = transactions.reduce<
    { category: string; value: number; type: string }[]
  >((acc, t) => {
    // Ahora buscamos que coincidan tanto la categoría como el tipo
    const idx = acc.findIndex(
      (item) => item.category === t.category && item.type === t.type,
    );

    if (idx !== -1) {
      acc[idx].value += parseFloat(t.amount);
    } else {
      // Si no existe el par categoría-tipo, creamos el nuevo objeto
      acc.push({
        category: t.category,
        value: parseFloat(t.amount),
        type: t.type,
      });
    }
    return acc;
  }, []);

  // add all the values to get the total and percentajes
  // console.log(transactionsData);
  const total = transactionsData.reduce((acc, curr) => acc + curr.value, 0);

  const totalSpendByMonth = transactionsData.filter(
    (transaction) => transaction.type !== 'income',
  );

  return (
    <div className="bg-bgComponents p-5 rounded-lg text-2xl flex flex-col gap-4 items-center w-full ">
      <h1 className="font-bold text-3xl border-b-2 w-full top-0">
        Gastos por categoria
      </h1>
      <h2 className="font-semibold text-xl">
        Total: ${formatNumber(total - totalIncome)}
      </h2>

      <ResponsiveContainer width="100%" height={500}>
        <PieChart>
          <Pie
            activeShape={renderActiveShape}
            data={totalSpendByMonth}
            cx="50%"
            cy="50%"
            innerRadius={90}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {totalSpendByMonth.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getCategoryColor(entry.category)}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <ul className="flex flex-wrap gap-2 w-full">
        {transactionsData
          .filter((transaction) => transaction.category !== 'Salario')
          .map((entry, index) => (
            <li
              key={index}
              className="flex min-w-0 w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-xl text-white sm:w-[48%] lg:w-fit"
              style={{
                backgroundColor: getCategoryColor(entry.category),
              }}
            >
              <p className="truncate">{entry.category}</p>
              <p className="shrink-0">
                {((entry.value / total) * 100).toFixed(2)}%
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};

// bg-${entry.category}
