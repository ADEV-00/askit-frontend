import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/navbar";
import { useSelector, useDispatch } from "react-redux";

//Components
import Post from "../../components/posts/Post";
import PostAuth from "../../components/posts/PostAuth";
import { fetchPosts } from "../../store/modules/posts/actions";

const HomePage = () => {
  const currState = useSelector((state) => state.Auth);
  const { currUser } = currState;
  const postsSelector = useSelector((state) => state.PostsState);
  const dispatch = useDispatch();

  const getPosts = () => dispatch(fetchPosts());

  const posts = postsSelector.posts.reverse();
  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let postsRender = posts.map((post) => {
    if (post.author_id === currUser.id) {
      return <PostAuth key={post.id} post={post} />;
    } else {
      return <Post key={post.id} post={post} />;
    }
  });

  return (
    <div className="bg-gray-100 w-full min-h-screen">
      <Navbar />
      {postsSelector.isLoading ? (
        <div className="text-8xl font-bold text-yellow-400 text-center">
          Loading...
        </div>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center pt-10 space-y-10">
            {postsRender}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
