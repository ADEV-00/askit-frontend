import React, { useEffect } from "react";
import Moment from "react-moment";
import { useSelector, useDispatch } from "react-redux";
import { fetchPost, deletePost } from "../../store/modules/posts/actions";
import { getComments } from "../../store/modules/comments/actions";
import { history } from "../../routes";

//compoenents
import Navbar from "../../components/Navbar/navbar";
import BtnLike from "../../components/utils/BtnLike";
import BtnDislike from "../../components/utils/BtnDislike";
import Comment from "../../components/Comment/comment";
import AddComment from "../../components/Comment/addComment";

const PostDetailsPage = (props) => {
  const postID = props.match.params.id;

  const dispatch = useDispatch();
  const currPost = (id) => dispatch(fetchPost(id));
  const deleteCurrPost = (id) => dispatch(deletePost(id));
  const getPostComments = (id) => dispatch(getComments(id));

  const currState = useSelector((state) => state);
  const post = currState.PostsState.post;
  const postComments = currState.CommentsState;

  const authID = currState.Auth.currUser.id;

  const submitDelete = (e) => {
    e.preventDefault();
    deleteCurrPost(post.id);
    history.push("/");
  };

  useEffect(() => {
    currPost(postID);
    getPostComments(postID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let singlePostComments = [];

  if (postComments) {
    // eslint-disable-next-line array-callback-return
    postComments.commentItems.map((item) => {
      if (item.postID === postID) {
        singlePostComments = item.comments;
      }
    });
  }

  let renderComments;
  if (singlePostComments) {
    renderComments = singlePostComments.map((comment) => {
      return <Comment key={comment.id} comment={comment} postID={postID} />;
    });
  }
  if (currState.PostsState.isLoading || currState.CommentsState.isLoading) {
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
      <div className="flex flex-col mt-10 items-center">
        <div className="bg-white w-4/5 min-h-52 shadow-lg rounded-lg lg:w-3/5 xl:w-2/4">
          <div className="w-full h-full flex flex-row p-3 space-x-3">
            <div className="space-y-2">
              <BtnLike postID={postID} />
              <BtnDislike postID={postID} />
            </div>
            <div className="flex flex-col flex-1 pr-10">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row">
                  <div className="w-12 h-12 rounded-full bg-gray-600"></div>
                  <div className="flex flex-col ml-3">
                    <div className="font-bold text-gray-800">Amel Sivsic</div>
                    <div className="font-light text-gray-400">
                      {post.created_at !== post.updated_at ? (
                        <div>
                          Edited: <Moment fromNow>{post.updated_at}</Moment>
                        </div>
                      ) : (
                        <Moment fromNow>{post.created_at}</Moment>
                      )}
                    </div>
                  </div>
                </div>
                {post.author_id === authID ? (
                  <div className="flex flex-row space-x-2">
                    <div
                      onClick={() => history.push(`/editpost/${post.id}`)}
                      className="bg-blue-500 text-white rounded-md w-9 h-9 flex justify-center items-center cursor-pointer"
                    >
                      <svg
                        width="17"
                        height="19"
                        viewBox="0 0 17 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.93466 0.532167C8.28073 0.532167 8.56161 0.829098 8.56161 1.19496C8.56161 1.56082 8.28073 1.85775 7.93466 1.85775H4.80911C2.64907 1.85775 1.2539 3.42194 1.2539 5.84245V13.1897C1.2539 15.6102 2.64907 17.1744 4.80911 17.1744H12.1854C14.3454 17.1744 15.7414 15.6102 15.7414 13.1897V9.63008C15.7414 9.26422 16.0223 8.96729 16.3684 8.96729C16.7144 8.96729 16.9953 9.26422 16.9953 9.63008V13.1897C16.9953 16.3658 15.0618 18.5 12.1854 18.5H4.80911C1.93267 18.5 0 16.3658 0 13.1897V5.84245C0 2.66636 1.93267 0.532167 4.80911 0.532167H7.93466ZM15.2153 1.30861L16.2326 2.38409C16.7283 2.90726 17.0008 3.60275 17 4.34331C17 5.08387 16.7275 5.77847 16.2326 6.30075L9.9556 12.9366C9.49501 13.4235 8.88143 13.6922 8.22941 13.6922H5.09801C4.92915 13.6922 4.76698 13.6197 4.64911 13.4916C4.53125 13.3643 4.46688 13.192 4.47106 13.0126L4.54964 9.67303C4.56552 9.00847 4.81881 8.38368 5.26352 7.91266H5.26436L11.5113 1.30861C12.5328 0.230465 14.1938 0.230465 15.2153 1.30861ZM10.9967 3.72647L6.15045 8.85029C5.93394 9.07917 5.81106 9.38317 5.80353 9.70573L5.74084 12.3666H8.22941C8.54706 12.3666 8.84465 12.2367 9.06952 11.999L13.945 6.84336L10.9967 3.72647ZM12.3974 2.24623L11.8828 2.78884L14.8311 5.90661L15.3465 5.36312C15.604 5.09094 15.7461 4.72861 15.7461 4.34331C15.7461 3.95712 15.604 3.59391 15.3465 3.32172L14.3292 2.24623C13.7967 1.68507 12.9307 1.68507 12.3974 2.24623Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div
                      onClick={submitDelete}
                      className="bg-red-500 text-white rounded-md w-9 h-9 flex justify-center items-center cursor-pointer"
                    >
                      <svg
                        width="17"
                        height="19"
                        viewBox="0 0 17 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M1.90962 6.38381C1.52925 6.41611 1.24557 6.75907 1.27597 7.15142C1.28149 7.21602 1.78068 13.5916 2.06804 16.2659C2.24671 17.9255 3.30956 18.9354 4.91396 18.9658C6.14166 18.9877 7.32608 19 8.48379 19C9.73176 19 10.9484 18.9858 12.1522 18.9601C13.6921 18.9287 14.7577 17.8989 14.9318 16.2725C15.2219 13.5745 15.7183 7.21507 15.7229 7.15142C15.7542 6.75907 15.4706 6.41516 15.0902 6.38381C14.7153 6.37336 14.3764 6.64506 14.346 7.03647C14.3431 7.07771 14.1401 9.67469 13.919 12.2442L13.8746 12.7569C13.7632 14.0341 13.6503 15.2614 13.5586 16.1158C13.46 17.0401 12.9765 17.517 12.1236 17.5351C9.8211 17.5854 7.4716 17.5883 4.93882 17.5408C4.03255 17.5227 3.54257 17.0553 3.44126 16.1091C3.15575 13.4548 2.6584 7.10107 2.65288 7.03647C2.62248 6.64506 2.28632 6.37146 1.90962 6.38381ZM6.55078 0C5.70529 0 4.96203 0.588059 4.74375 1.43072L4.50982 2.62869C4.43422 3.0214 4.10011 3.30819 3.71326 3.31449L0.690758 3.3146C0.30946 3.3146 2.30828e-07 3.6338 2.30828e-07 4.02711C2.30828e-07 4.42042 0.30946 4.73962 0.690758 4.73962L3.68626 4.73948C3.69092 4.73957 3.69558 4.73962 3.70025 4.73962L3.72272 4.73867L13.2776 4.7395C13.2851 4.73958 13.2925 4.73962 13.2999 4.73962L13.3141 4.73867L16.3092 4.73962C16.6905 4.73962 17 4.42042 17 4.02711C17 3.6338 16.6905 3.3146 16.3092 3.3146L13.2874 3.31365L13.1944 3.30757C12.8478 3.26119 12.5598 2.98969 12.4894 2.62869L12.2656 1.47347C12.0382 0.588059 11.2949 0 10.4494 0H6.55078ZM6.55078 1.42502H10.4494C10.6705 1.42502 10.8648 1.57797 10.921 1.79743L11.1356 2.90894C11.1628 3.04973 11.2025 3.18541 11.2534 3.31485H5.74653C5.79742 3.18541 5.83723 3.04973 5.86462 2.90894L6.08843 1.75373C6.1354 1.57797 6.32973 1.42502 6.55078 1.42502Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-6">
                <div className="text-lg font-bold text-gray-700">
                  {post.title}
                </div>
              </div>
              <div className="my-5">{post.content}</div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col mt-4 items-center ">
          <div className="mb-6 font-lignt text-gray-400">
            Comments {singlePostComments.length}
          </div>
          {authID ? <AddComment postID={post.id} /> : null}
          {renderComments}
        </div>
      </div>
    </div>
  );
};

export default PostDetailsPage;
