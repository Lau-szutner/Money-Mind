import { useState } from 'react';
import { SectionHeading } from '@/app/user/community/components/SectionHeading';

const CHAT_NAMES = ['MoneyGOl123', 'nickBlack1', 'CoffeBlow'];

export const ChatsSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="h-fit rounded-xl bg-bgComponents p-5">
      <SectionHeading
        title="Chats"
        expanded={isExpanded}
        controlsId="chat-list"
        onToggle={() => setIsExpanded((expanded) => !expanded)}
      />
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out motion-reduce:transition-none ${
          isExpanded
            ? 'grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <ul id="chat-list" aria-hidden={!isExpanded} className="font-light">
            {CHAT_NAMES.map((chat) => (
              <li key={chat} className="text-gray-400 hover:text-greenIn">
                {chat}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
