import React from 'react';

const FilterByCommunity: React.FC = () => {
  const communities = [
    'SmartInvestments',
    'Money&freedom',
    'Cripto',
    'Taxes',
    'StocksForAll',
    'MasterOfMoney',
    'DayByDay',
    'New releases',
  ];

  return (
    <div className="bg-bgComponents h-full p-7 rounded-xl">
      <div>
        <h2 className="text-3xl font-bold pb-5">Communities</h2>
        <div>
          <ul className="p-4 pl-0 flex flex-col gap-4">
            {communities.map((t, index) => (
              <div className="flex justify-between" key={t}>
                <li className="text-2xl">/{t}</li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FilterByCommunity;
