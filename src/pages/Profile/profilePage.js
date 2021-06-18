import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAuthPosts } from "../../store/modules/posts/actions";

//Compoenents
import Navbar from "../../components/Navbar/navbar";
import PostAuth from "../../components/posts/PostAuth";
import Post from "../../components/posts/Post";
import ProfileCard from "../../components/ProfileCard/profileCard";

const ProfilePage = (props) => {
  const currState = useSelector((state) => state);
  const profileID = props.match.params.id;

  const dispatch = useDispatch();

  const getUserPosts = (id) => dispatch(fetchAuthPosts(id));

  useEffect(() => {
    getUserPosts(profileID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const posts = currState.PostsState.authPosts;

  let postsRender = posts.map((post) => {
    if (post.author_id === currState.Auth.currUser.id) {
      return <PostAuth key={post.id} post={post} />;
    } else {
      return <Post key={post.id} post={post} />;
    }
  });

  return (
    <div className="bg-gray-100 w-full min-h-screen">
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        <div className="w-full flex justify-center my-10">
          <ProfileCard profileID={profileID} />
        </div>
        <div className="w-full flex flex-col items-center space-y-5">
          {postsRender}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
