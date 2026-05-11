import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CommunityBasic } from '@/app/types/types';

const Chats = ['MoneyGOl123', 'nickBlack1', 'CoffeBlow'];

interface FilterByCommunityProps {
  communities: CommunityBasic[];
}

const FilterByCommunity = ({ communities }: FilterByCommunityProps) => {
  const router = useRouter();

  const handleCommunityClick = (id: number) => {
    router.push(`/user/community/${id}`);
  };

  return (
    <div className="grid gap-5 ">
      <div className="bg-bgComponents h-fit p-7 rounded-xl gap-5">
        <h2 className="text-3xl font-bold pb-5">Communities</h2>
        <div>
          <ul>
            {communities.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span
                  className="text-2xl hover:text-greenIn cursor-pointer"
                  onClick={() => handleCommunityClick(item.id)}
                >
                  /{item.slug}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Link href="/user/community/new">
        <div className="bg-bgComponents h-fit p-7 rounded-xl text-3xl font-bold hover:text-greenIn cursor-pointer">
          New Community +
        </div>
      </Link>

      {/* <div className="bg-bgComponents h-fit p-7 rounded-xl text-3xl font-bold">
        <p className="text-3xl font-bold pb-5">Chats</p>
        <div className="font-light">
          {Chats.map((chat, key) => (
            <p className="text-2xl hover:text-greenIn cursor-pointer" key={key}>
              {chat}
            </p>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default FilterByCommunity;
