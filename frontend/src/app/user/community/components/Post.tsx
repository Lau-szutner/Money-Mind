import { PostType } from '@/app/types/types';

const Post = ({ user, title, body, createdAt }: PostType) => {
  return (
    <div className="p-5 border-t-[0.5px] border-white hover:bg-slate-950">
      <div className="flex flex-col">
        <div className="flex gap-5">
          <p className="text-xl text-greenIn font-bold">
            /FALTA HACER COMUNIDADES
          </p>
          <p>-</p>
          <p className="text-xl font-light">{createdAt}</p>
        </div>
        <h1 className="text-xl">{user}</h1>
      </div>
      <div className="gap-5 flex flex-col mt-4">
        <p className="text-2xl font-bold">{title}</p>
        <p>{body}</p>
      </div>
    </div>
  );
};

export default Post;
