import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../store/modules/comments/actions";

const AddComment = ({ postID }) => {
  const [body, setBody] = React.useState("");
  const dispatch = useDispatch();
  const currState = useSelector((state) => state);
  const addComment = (commentData) =>
    dispatch(createComment(commentData, commentSuccess));

  //Hard reload
  const commentSuccess = () => {
    // window.location.reload();
  };

  const handleChange = (e) => {
    setBody(e.target.value);
  };

  const submitComment = (e) => {
    e.preventDefault();
    addComment({
      post_id: parseInt(postID),
      body,
    });
  };

  return (
    <div className="flex w-full justify-center mb-7">
      <div className="bg-white w-4/5  shadow-lg rounded-lg lg:w-3/5 xl:w-2/4">
        <div className="w-full h-full p-3 pt-4">
          <div className="w-full border-2 border-gray-400 p-2 rounded-md h-20">
            <input
              type="text"
              placeholder="Type here your comment"
              className="w-full outline-none"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row-reverse my-5">
            {currState.CommentsState.isLoading ? (
              <button
                onClick={submitComment}
                blocked
                className="py-2 px-3 bg-yellow-400 rounded-md text-white font-bold cursor-pointer"
              >
                Adding comment...
              </button>
            ) : (
              <button
                onClick={submitComment}
                className="py-2 px-3 bg-yellow-400 rounded-md text-white font-bold cursor-pointer"
              >
                Add comment
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddComment;
