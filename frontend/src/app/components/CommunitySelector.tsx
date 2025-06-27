import React from 'react';
interface Props {
  data: CommunityData;
}

const CommunitySelector: React.FC<Props> = ({ data }: Props) => {
  return (
    <div className="w-3/12 bg-bgComponents p-5 text-3xl">
      <h2>Communities</h2>
      <h2>{data.title}</h2>
      <ul className="text-xl">
        <li>Hola</li>
        <li>Hola</li>
        <li>Hola</li>
        <li>Hola</li>
        <li>Hola</li>
      </ul>
    </div>
  );
};

interface CommunityData {
  title: string;
  author: string;
  description: string;
  topics: string;
  price: number;
}

const data1: CommunityData[] = [
  {
    title: 'Credit Cards',
    author: 'Michelle K. Reeves',
    description:
      'Discover how to use credit cards responsibly, avoid common traps, and increase your credit score. This course explains how interest, limits, and credit history work',
    topics: 'Credit, Debt Management',
    price: 12,
  },
  {
    title: 'Credit Cards',
    author: 'Michelle K. Reeves',
    description:
      'Discover how to use credit cards responsibly, avoid common traps, and increase your credit score. This course explains how interest, limits, and credit history work',
    topics: 'Credit, Debt Management',
    price: 12,
  },
];
