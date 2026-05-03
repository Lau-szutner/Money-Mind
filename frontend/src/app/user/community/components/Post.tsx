import { PostType } from '@/app/types/types';
import Image from 'next/image';

const Post = ({ user, title, body, createdAt }: PostType) => {
  return (
    <div className="p-5 border-t-[0.5px] border-white  hover:bg-background hover:cursor-pointer">
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

      <div className="gap-5 flex flex-col  py-5">
        <p className="text-2xl font-bold">{title}</p>
        <p>{body}</p>
      </div>

      <div className="flex w-full justify-between">
        {/* Agrupamos los dos primeros para que se mantengan juntos a la izquierda */}
        <div className="flex gap-5">
          <div className="flex bg-[#323232] rounded-lg w-fit p-1 gap-2">
            <Image
              src="/icons/arrow_circle_up.svg"
              alt="up"
              width={35}
              height={35}
              className="hover:scale-110 transition-all"
            />
            <Image
              src="/icons/arrow_circle_down.svg"
              alt="down"
              width={35}
              height={35}
              className="hover:scale-110 transition-all"
            />
          </div>

          <div className="flex bg-[#323232] rounded-lg w-fit p-1 gap-4">
            <Image
              src="/icons/comments.svg"
              alt="comments"
              width={35}
              height={35}
              className="hover:scale-110 transition-all"
            />
          </div>
        </div>

        {/* Este se irá al final solo */}
        <div className="flex bg-[#323232] rounded-lg w-fit p-1 gap-4">
          <Image
            src="/icons/bookmark.svg"
            alt="bookmark"
            width={35}
            height={35}
            className="hover:scale-110 transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
