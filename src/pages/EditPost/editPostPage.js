import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPost, updatePost } from "../../store/modules/posts/actions";

//Components
import Navbar from "../../components/Navbar/navbar";
import { history } from "../../routes";
import { Redirect } from "react-router-dom";

const EditPostPage = (props) => {
  const postID = props.match.params.id;
  const currState = useSelector((state) => state);
  const dispatch = useDispatch();

  //Get post data
  const postData = (id) => dispatch(fetchPost(id));
  const post = currState.PostsState.post;

  const authID = currState.Auth.currUser.id;
  const [postUpdate, setPostUpdate] = React.useState({
    title: post.title,
    content: post.content,
  });
  const updatedPost = (postData) =>
    dispatch(updatePost(postData, updateSuccess));

  const updateSuccess = () => {
    history.push(`/post/${postID}`);
  };

  useEffect(() => {
    postData(postID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setPostUpdate({
      ...postUpdate,
      [e.target.name]: e.target.value,
    });
  };

  const submitUpdatedPost = (e) => {
    e.preventDefault();
    updatedPost({
      id: parseInt(postID),
      title: postUpdate.title,
      content: postUpdate.content,
      author_id: authID,
    });
  };

  if (!currState.Auth.isAuth) {
    return <Redirect to="/" />;
  }

  if (currState.PostsState.isLoading) {
    return (
      <div className="w-full min-h-screen bg-gray-100">
        <Navbar />
        <div className="text-6xl text-center font-bold text-yellow-400">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex justify-center mt-10">
        <div className="w-4/5 bg-white shadow-lg rounded-lg px-8 py-6 md:w-3/5 lg:w-2/5">
          <div className="font-bold text-xl text-gray-800">
            Update your question
          </div>
          <form onSubmit={submitUpdatedPost}>
            {currState.PostsState.postsError ? (
              <div className="bg-red-400 py-5 px-3 rounded-lg text-white mt-2">
                {currState.PostsState.postsError}
              </div>
            ) : (
              ""
            )}
            <div className="mb-3 mt-7">
              <div className="mb-2 font-bold text-gray-700">Title:</div>
              <div className="border-2 border-gray-300 py-3 px-5 rounded-md">
                <input
                  type="text"
                  value={postUpdate.title}
                  placeholder="Type catching attention title"
                  className="bg-transparent  w-full focus:outline-none"
                  name="title"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="mb-2 font-bold text-gray-700">Question:</div>
              <div className="border-2 border-gray-300 py-3 px-5 rounded-md h-44">
                <input
                  type="text-area"
                  value={postUpdate.content}
                  placeholder="Type your question:"
                  className="bg-transparent w-full focus:outline-none"
                  name="content"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-row-reverse">
              {currState.PostsState.isLoading ? (
                <button
                  type="submit"
                  blocked
                  disabled
                  className="bg-blue-400 py-3 px-4 font-bold rounded-md shadow-md text-white mb-10 mt-3"
                >
                  Updating...
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-blue-400 py-3 px-4 font-bold rounded-md shadow-md text-white mb-10 mt-3"
                >
                  Update
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPostPage;
