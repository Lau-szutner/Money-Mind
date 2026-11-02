import { ChatsSection } from '@/app/user/community/components/AsideChat';
import { AsideCommunity } from '@/app/user/community/components/AsideCommunity';
import { CommunitySideBarProps } from '@/app/types/communities';

const CommunitySideBar = (props: CommunitySideBarProps) => (
  <aside className="flex flex-col gap-5">
    <AsideCommunity {...props} />
    <ChatsSection />
  </aside>
);

export default CommunitySideBar;
