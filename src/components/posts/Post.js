import React from "react";
import Moment from "react-moment";

//Comeponents
import BtnLike from "../utils/BtnLike";
import BtnDislike from "../utils/BtnDislike";
import { history } from "../../routes";

const Post = ({ post }) => {
  const { firstname, lastname } = post.author;
  return (
    <div className="bg-white w-4/5 h-52 min-h-52  shadow-lg rounded-lg lg:w-3/5 xl:w-2/4">
      <div className="w-full h-full flex flex-row p-3 space-x-3">
        <div className="space-y-2">
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
          </div>
          <div
            className="mt-6 flex-1 cursor-pointer"
            onClick={() => history.push(`/post/${post.id}`)}
          >
            <div className="text-lg font-bold text-gray-700">{post.title}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
