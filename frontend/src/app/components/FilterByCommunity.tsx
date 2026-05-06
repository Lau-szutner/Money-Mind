import React from 'react';
import {
  type Community,
  type UserCommunity,
  type Props,
} from '@/app/types/communities'; // ajustá la ruta

const FilterByCommunity = ({ communities }: Props) => {
  for (const comunidad of communities) {
    console.log(comunidad); // ← acá ya es el objeto
  }
  return (
    <div className="grid gap-2 place-content-start">
      <div className="bg-bgComponents h-fit p-7 rounded-xl gap-5">
        <h2 className="text-3xl font-bold pb-5">Communities</h2>
        <div>
          <ul>
            {communities.map((item) => (
              <li key={item.community_id} className="flex justify-between">
                <span className="text-2xl hover:text-greenIn cursor-pointer">
                  /{item.Community.slug}
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
