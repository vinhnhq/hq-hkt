import { useRouter } from "next/router";

import { observer } from "mobx-react";
import { useEffect, useState } from "react";

import { useAppContext } from "../../app-context";

import Comment from "../../components/comment";
import Post from "../../components/post";

const PostPage = observer(() => {
  const router = useRouter();
  const params = router.query;

  const { api, store } = useAppContext();
  const [loading, setLoading] = useState(false);

  const postId = Number(params.postId);

  const load = async () => {
    try {
      setLoading(true);
      await api.post.getById(postId);
      await api.comment.getByPostId(postId);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  const post = store.post.byId.get(Number(params.postId));

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <Post ellipsisBody={false} post={post} />

      <h2>Comments </h2>

      {post.comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
});

export default PostPage;
