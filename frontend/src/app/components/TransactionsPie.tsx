'use client';
import React, { useState } from 'react';
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
  dataKey?: string;
  payload?: any;
};

type PieSectorDataItem = React.SVGProps<SVGPathElement> &
  Partial<SectorProps> &
  PieSectorData;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
        {payload.name}
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
        {payload.name}
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

const TransactionsPie: React.FC<TransactionsPieProps> = ({ transactions }) => {
  // group transactons by name and value, used to data for the pieChart
  const data = transactions.reduce<{ name: string; value: number }[]>(
    (acc, t) => {
      const idx = acc.findIndex((item) => item.name === t.title);
      if (idx !== -1) {
        acc[idx].value += parseFloat(t.amount);
      } else {
        acc.push({ name: t.title, value: parseFloat(t.amount) });
      }
      return acc;
    },
    []
  );

  // add all the values to get the total and percentajes
  console.log(data);
  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  // state por active selector
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="bg-bgComponents p-5 rounded-lg text-2xl flex flex-col gap-4 items-center w-full mt-5">
      <h1 className="font-bold text-3xl border-b-2 w-full top-0">Pie Chart</h1>
      <h2 className="font-semibold text-xl">Total: ${total.toFixed(2)}</h2>
      // main pie component
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <ul className="grid grid-cols-2 gap-2 justify-between items-center w-full">
        {data.map((entry, index) => (
          <li
            key={index}
            className="flex justify-between items-center black-buttons"
          >
            <p>{entry.name}</p>
            <p>{((entry.value / total) * 100).toFixed(2)}%</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsPie;
