interface post {
  user: string;
}

const Post = (post: post) => {
  return (
    <div className="p-5 bg-gray-900 rounded-xl mt-10">
      <div className="flex gap-5 items-center">
        <div className="h-5 rounded-full bg-blue-500 w-5"></div>
        <h1 className="text-xl">{post.user}</h1>
      </div>
      <div className="gap-5 flex flex-col mt-10">
        <p className="text-xl">Title</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A inventore
          cupiditate consequatur, excepturi tempore perferendis eveniet, amet
          voluptas quaerat numquam harum eaque optio nobis odit soluta, placeat
          reprehenderit hic magni eum fugit quod esse facere ab neque? Sed
          officia minima quia ad, eveniet dignissimos voluptatum, laboriosam
          reiciendis possimus, recusandae perspiciatis?
        </p>
      </div>
    </div>
  );
};

export default Post;
