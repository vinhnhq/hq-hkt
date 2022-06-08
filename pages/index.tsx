import { observer } from "mobx-react";
import { useCallback, useEffect, useState } from "react";

import { useAppContext } from "../app-context";

import Post from "../components/post";

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
  const { api, store } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(false);

  console.log("rerender HOME BLOG PAGE");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      await api.post.getAll();
      await api.user.getAll();
    } finally {
      setLoading(false);
      setStart(false);
    }
  }, [api.post, api.user]);

  useEffect(() => {
    if (start) {
      load();
    }
  }, [load, start]);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h1>Posts</h1>

      <button onClick={() => setStart(!start)}>
        {!start ? "click to load" : "loading"}
      </button>

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
