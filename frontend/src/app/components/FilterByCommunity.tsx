import React from 'react';

export interface Community {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string | null;
}

interface Props {
  communities: Community[];
}

const FilterByCommunity = ({ communities }: Props) => {
  return (
    <div className="grid gap-2 place-content-start">
      <div className="bg-bgComponents h-fit p-7 rounded-xl gap-5">
        <h2 className="text-3xl font-bold pb-5">Communities</h2>
        <div>
          <ul>
            {communities.map((c) => (
              <li key={c.id} className="flex justify-between">
                <span className="text-2xl hover:text-greenIn cursor-pointer">
                  /{c.slug}
                </span>
              </li>
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
