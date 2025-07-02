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
    <div className="grid gap-2 place-content-start">
      <div className="bg-bgComponents h-fit p-7 rounded-xl gap-5">
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

      <div className="bg-bgComponents h-fit p-7 rounded-xl text-3xl font-bold">
        New Communitie +
      </div>

      <div className="bg-bgComponents h-fit p-7 rounded-xl text-3xl font-bold">
        <p className="font-bold">Chats</p>
        <div className="font-light">
          <p>MoneyGOl123</p>
          <p>nickBlack1</p>
          <p>Szet13</p>
          <p>CoffeBlow</p>
          <p>LoeMi</p>
        </div>
      </div>
    </div>
  );
};

export default FilterByCommunity;
