interface post {
  user: string;
  title: string;
  body: string;
  createdAt: string;
}

const Post = (post: post) => {
  return (
    <div className="p-5 bg-background rounded-xl mt-10">
      <div className="flex flex-col">
        <div className="flex gap-5">
          <p className="text-xl text-greenIn font-bold">/PersonalBudgeting</p>
          <p className="text-xl font-light">{post.createdAt}</p>
        </div>
        <h1 className="text-xl">{post.user}</h1>
      </div>
      <div className="gap-5 flex flex-col mt-4">
        <p className="text-2xl font-bold">{post.title}</p>
        <p>{post.body}</p>
      </div>
    </div>
  );
};

export default Post;
