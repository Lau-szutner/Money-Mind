interface post {
  user: string;
  title: string;
  body: string;
}

const Post = (post: post) => {
  return (
    <div className="p-5 bg-background rounded-xl mt-10">
      <div className="flex gap-5 items-center">
        <div className="h-5 rounded-full bg-blue-500 w-5"></div>
        <h1 className="text-xl">{post.user}</h1>
      </div>
      <div className="gap-5 flex flex-col mt-10">
        <p className="text-xl">{post.title}</p>
        <p>{post.body}</p>
      </div>
    </div>
  );
};

export default Post;
