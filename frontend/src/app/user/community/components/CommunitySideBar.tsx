import { ChatsSection } from '@/app/user/community/components/AsideChat';
import { AsideCommunity } from '@/app/user/community/components/AsideCommunity';
import { CommunitySideBarProps } from '@/app/types/communities';

const CommunitySideBar = (props: CommunitySideBarProps) => (
  <aside className="flex flex-col gap-5">
    <button
      type="button"
      onClick={props.onCreatePost}
      className="w-full rounded-md bg-bgComponents px-5 py-3 text-left font-semibold transition hover:bg-green-600 focus:ring-2 focus:ring-greenIn"
    >
      + Nueva publicación
    </button>
    <AsideCommunity {...props} />
    <ChatsSection />
  </aside>
);

export default CommunitySideBar;
