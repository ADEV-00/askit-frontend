import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../../store/modules/posts/actions";

//Componenets
import Navbar from "../../components/Navbar/navbar";

const CreatePostPage = () => {
  const [post, setPost] = React.useState({
    title: "",
    content: "",
  });

  const currState = useSelector((state) => state);
  const dispatch = useDispatch();

  const createNewPost = (postData) => dispatch(createPost(postData));

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const submitPost = (e) => {
    e.preventDefault();
    createNewPost({
      title: post.title,
      content: post.content,
      author_id: currState.Auth.isAuth.id,
    });
  };

  //Redirect user if its not loged in
  if (!currState.Auth.isAuth) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 ">
      <Navbar />
      <div className="flex justify-center mt-10">
        <div className="w-4/5 bg-white shadow-lg rounded-lg px-8 py-6 md:w-3/5 lg:w-2/5">
          <div className="font-bold text-xl text-gray-800">New Question</div>
          <form onSubmit={submitPost}>
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
                  Publishing...
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-blue-400 py-3 px-4 font-bold rounded-md shadow-md text-white mb-10 mt-3"
                >
                  Publish
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
