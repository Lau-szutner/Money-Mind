import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CommunityBasic } from '@/app/types/types';

import NewCommunity from '@/app/user/community/components/NewCommunity';

const ChatsArray = ['MoneyGOl123', 'nickBlack1', 'CoffeBlow'];

interface FilterByCommunityProps {
  communities: CommunityBasic[];
}

const Chats = () => {
  const [showChats, setShowChats] = useState(true);
  return (
    <div>
      <div className="bg-bgComponents h-fit p-5 rounded-xl">
        <div className="flex items-center justify-between">
          <p className="font-bold text-heading-sm">Chats</p>
          <button
            type="button"
            onClick={() => setShowChats((prev) => !prev)}
            aria-expanded={showChats}
            aria-controls="chat-list"
            className="rounded px-2 py-1 text-sm text-gray-400 hover:text-greenIn focus-visible:outline-2 focus-visible:outline-greenIn cursor-pointer"
          >
            {showChats ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out motion-reduce:transition-none ${
            showChats
              ? 'grid-rows-[1fr] opacity-100'
              : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div id="chat-list" aria-hidden={!showChats} className="font-light">
              {ChatsArray.map((chat, key) => (
                <p
                  className="text-gray-400 hover:text-greenIn cursor-pointer"
                  key={key}
                >
                  {chat}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CommunitySideBar = ({ communities }: CommunitySideBarProps) => {
  const router = useRouter();
  const [showNewCommunity, setShowNewCommunity] = useState(false);
  const [showCommunities, setShowCommunities] = useState(true);

  const handleCommunityClick = (slug: string) => {
    router.push(`/user/community/${slug}`);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-bgComponents h-fit p-5 rounded-xl gap-5">
        <div className=" flex items-center justify-between">
          <p className="font-bold text-heading-sm">Comunidades</p>
          <button
            type="button"
            onClick={() => setShowCommunities((prev) => !prev)}
            aria-expanded={showCommunities}
            aria-controls="community-list"
            className="rounded px-2 py-1 text-sm text-gray-400 hover:text-greenIn focus-visible:outline-2 focus-visible:outline-greenIn cursor-pointer"
          >
            {showCommunities ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out motion-reduce:transition-none ${
            showCommunities
              ? 'grid-rows-[1fr] opacity-100'
              : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <ul id="community-list" aria-hidden={!showCommunities}>
              {communities.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <button
                    type="button"
                    tabIndex={showCommunities ? 0 : -1}
                    className="text-gray-400 hover:text-greenIn cursor-pointer"
                    onClick={() => handleCommunityClick(item.slug)}
                  >
                    /{item.slug}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setShowNewCommunity((prev) => !prev)}
        className="bg-bgComponents h-fit p-7 rounded-xl font-bold hover:text-greenIn cursor-pointer text-left"
      >
        {showNewCommunity ? 'Cerrar formulario' : 'New Community +'}
      </button>

      {showNewCommunity && (
        <div className="bg-bgComponents p-7 rounded-xl">
          <NewCommunity onClose={() => setShowNewCommunity(false)} />
        </div>
      )}
      <Chats />
    </div>
  );
};

export default CommunitySideBar;
