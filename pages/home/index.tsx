import { observer } from "mobx-react";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";

import { useAppContext } from "../../app-context";

import Post from "../../components/post";
import { IPost, IUser } from "../../types";

const HomeTitlePage = observer(() => {
  const { store } = useAppContext();

  const [text, setText] = useState("");

  console.log("rerender HOME TITLE PAGE");

  return (
    <div>
      <h1>type something</h1>
      <input value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  );
});

const HomeBlogPage = observer(() => {
  const { store } = useAppContext();

  const {
    isLoading: isLoadingPosts,
    error: errorPosts,
    data: dataPosts,
  } = useQuery<IPost[]>("posts", async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();
    store.post.load(posts);
    return posts;
  });

  const {
    isLoading: isLoadingUsers,
    error: errorUsers,
    data: dataUsers,
  } = useQuery<IUser[]>("users", async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();

    store.user.load(data);

    return data;
  });

  console.log("rerender HOME BLOG PAGE");

  if (isLoadingPosts || isLoadingUsers) {
    return <div>loading...</div>;
  }

  if (errorPosts || errorUsers) {
    return <div>error</div>;
  }

  return (
    <div>
      <h1>Posts</h1>

      {store.post.all.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
});

const HomePage = () => {
  return (
    <>
      <HomeTitlePage />
      <HomeBlogPage />
    </>
  );
};

export default HomePage;
