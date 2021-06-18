import React from "react";
import Moment from "react-moment";
import { useSelector, useDispatch } from "react-redux";
import BtnDelete from "../utils/BtnDelete";
import BtnEdit from "../utils/BtnEdit";
import {
  updateComment,
  deleteComment,
} from "../../store/modules/comments/actions";

const Comment = ({ comment, postID }) => {
  const currState = useSelector((state) => state);
  const currComment = comment.id;
  const [editActive, setEditActive] = React.useState(false);
  const [newComment, setNewComment] = React.useState(comment.body);
  const authID = currState.Auth.currUser.id;

  const dispatch = useDispatch();
  const theCommentUpdate = (newCommentData) =>
    dispatch(updateComment(newCommentData, updateSuccess));

  const removeComment = (commentData) =>
    dispatch(deleteComment(commentData, deleteSuccess));

  const updateSuccess = () => {
    setEditActive(false);
  };
  const deleteSuccess = () => {
    window.location.reload();
  };

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };

  const submitUpdatedComment = (e) => {
    theCommentUpdate({
      id: currComment,
      body: newComment,
    });
  };

  const submiteDeleteComment = (e) => {
    e.preventDefault();
    removeComment({
      id: currComment,
      postID,
    });
  };

  return (
    <div className="bg-white w-4/5 min-h-52 shadow-lg rounded-lg lg:w-3/5 xl:w-2/4 px-6 py-5 border-yellow-400 border-l-8 mb-5">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row space-x-3">
            <div className="h-12 w-12 rounded-full bg-gray-500"></div>
            <div className="flex flex-col">
              <div className="font-bold text-gray-800">
                {comment.user.firstname} {comment.user.lastname}
              </div>
              <div className="font-light text-gray-400">
                <Moment fromNow>{comment.created_at}</Moment>
              </div>
            </div>
          </div>
          {comment.user.id === authID ? (
            <div className="flex flex-row space-x-2">
              {!editActive ? (
                <>
                  <div
                    onClick={() => setEditActive(true)}
                    className="bg-blue-500 text-white rounded-md w-9 h-9 flex justify-center items-center cursor-pointer"
                  >
                    <BtnEdit />
                  </div>
                  <div
                    onClick={submiteDeleteComment}
                    className="bg-red-500 text-white rounded-md w-9 h-9 flex justify-center items-center cursor-pointer"
                  >
                    <BtnDelete />
                  </div>
                </>
              ) : (
                <div className="flex flex-row space-x-2">
                  <div
                    onClick={submitUpdatedComment}
                    className="px-4 flex justify-center items-center text-white rounded-lg bg-yellow-400 cursor-pointer"
                  >
                    Update
                  </div>
                  <div
                    onClick={() => setEditActive(false)}
                    className="px-4 flex justify-center items-center text-red-400 rounded-lg cursor-pointer"
                  >
                    Cancel
                  </div>
                </div>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
        {!editActive ? (
          <div className="mt-5">{comment.body}</div>
        ) : (
          <div className="border-2 border-gray-300 py-3 px-5 mt-3 rounded-md ">
            <input
              className="w-full outline-none"
              type="text"
              value={newComment}
              onChange={handleChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
