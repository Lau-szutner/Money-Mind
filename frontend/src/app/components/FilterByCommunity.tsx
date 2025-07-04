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
                <li className="text-2xl hover:text-greenIn  cursor-pointer">
                  /{t}
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-bgComponents h-fit p-7 rounded-xl text-3xl font-bold hover:text-greenIn  cursor-pointer">
        New Communitie +
      </div>

      <div className="bg-bgComponents h-fit p-7 rounded-xl text-3xl font-bold">
        <p className="text-3xl font-bold pb-5">Chats</p>
        <div className="font-light">
          <p className="text-2xl hover:text-greenIn  cursor-pointer">
            MoneyGOl123
          </p>
          <p className="text-2xl hover:text-greenIn  cursor-pointer">
            nickBlack1
          </p>
          <p className="text-2xl hover:text-greenIn  cursor-pointer">Szet13</p>
          <p className="text-2xl hover:text-greenIn  cursor-pointer">
            CoffeBlow
          </p>
          <p className="text-2xl hover:text-greenIn  cursor-pointer">LoeMi</p>
        </div>
      </div>
    </div>
  );
};

export default FilterByCommunity;
