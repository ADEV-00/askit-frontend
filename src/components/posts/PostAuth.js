import React from "react";
import "./post.css";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../store/modules/posts/actions";

//Comeponents
import BtnLike from "../utils/BtnLike";
import BtnDislike from "../utils/BtnDislike";
import BtnMore from "../utils/BtnMore";
import { history } from "../../routes";

const PostAuth = ({ post }) => {
  const [module, setModule] = React.useState(false);
  const { firstname, lastname } = post.author;
  const [deleteModal, setDeleteModal] = React.useState(false);

  const dispatch = useDispatch();
  const currState = useSelector((state) => state);
  const deleteCurrPost = (id) => dispatch(deletePost(id));

  const submitDelete = (e) => {
    e.preventDefault();
    deleteCurrPost(post.id);
    setDeleteModal(false);
  };

  return (
    <div className="bg-white w-4/5 h-52 min-h-52  shadow-lg rounded-lg border-blue-400 border-2 lg:w-3/5 xl:w-2/4 relative">
      {deleteModal ? (
        <div className="w-2/6 h-4/6 backdrop-filter backdrop-blur-lg absolute top-3.5 left-64 flex justify-center items-center flex-col shadow-md rounded-lg space-y-5">
          <div className="text-lg font-bold">Delete post?</div>
          <div className="flex flex-row space-x-3">
            <div className="p-3 rounded-md text-red-500" onClick={submitDelete}>
              Confirm
            </div>
            <div
              onClick={() => {
                setDeleteModal(!deleteModal);
                setModule(!module);
              }}
              className="p-3 rounded-md bg-blue-500 text-white"
            >
              Cancel
            </div>
          </div>
        </div>
      ) : null}
      {module ? (
        <div className="module bg-white shadow-md py-3 pr-5 pl-3 space-y-3 rounded-md">
          <Link
            onClick={() => console.log("its working")}
            to={`/editpost/${post.id}`}
            post={post}
            className="text-yellow-400 cursor-pointer"
          >
            Edit
          </Link>
          <div
            onClick={() => setDeleteModal(true)}
            className="text-red-500 cursor-pointer"
          >
            Delete
          </div>
        </div>
      ) : null}

      <div className="w-full h-full flex flex-row p-3 space-x-3">
        <div className="space-y-4">
          <BtnLike postID={post.id} />
          <BtnDislike postID={post.id} />
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex flex-row justify-between items-center">
            <div
              className="flex flex-row cursor-pointer"
              onClick={() => history.push(`/profile/${post.author.id}`)}
            >
              <div className="w-12 h-12 rounded-full bg-gray-600"></div>
              <div className="flex flex-col ml-3">
                <div className="font-bold text-gray-800">
                  {firstname} {lastname}
                </div>
                <div className="font-light text-gray-400">
                  <Moment fromNow>{post.created_at}</Moment>
                </div>
              </div>
            </div>
            <div className="cursor-pointer" onClick={() => setModule(!module)}>
              <BtnMore />
            </div>
          </div>
          <div
            className="mt-6 h-full flex-1 cursor-pointer"
            onClick={() => history.push(`/post/${post.id}`)}
          >
            <div className="text-lg font-bold text-gray-700">{post.title}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostAuth;
