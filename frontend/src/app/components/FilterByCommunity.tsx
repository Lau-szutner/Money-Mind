import React from 'react';
import {
  type Community,
  type UserCommunity,
  type Props,
} from '@/app/types/communities'; // ajustá la ruta

const Chats = ['MoneyGOl123', 'nickBlack1', 'CoffeBlow'];

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
          {Chats.map((chat, key) => (
            <p
              className="text-2xl hover:text-greenIn  cursor-pointer"
              key={key}
            >
              {chat}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterByCommunity;
