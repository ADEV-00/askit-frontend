import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../../routes";
import {
  fetchLikes,
  deleteLike,
  likePost,
} from "../../store/modules/likes/actions";

const BtnLike = ({ postID }) => {
  const currState = useSelector((state) => state);
  const currPostLikes = currState.LikesState;
  const authID = currState.Auth.currUser ? currState.Auth.currUser.id : "";

  const dispatch = useDispatch();

  let likesCount = 0;
  let likeID = null;
  let authLiked = false;

  if (currPostLikes) {
    // eslint-disable-next-line array-callback-return
    currPostLikes.likeItems.map((item) => {
      if (item.postID === postID) {
        likesCount = item.likes.length;

        // eslint-disable-next-line array-callback-return
        item.likes.map((like) => {
          if (like.user_id === authID) {
            authLiked = true;
            likeID = like.id;
          }
        });
      }
    });
  }

  const getLikes = (id) => dispatch(fetchLikes(id));
  const createLike = (id) => dispatch(likePost(id));
  const unLike = (likeData) => dispatch(deleteLike(likeData));

  useEffect(() => {
    getLikes(postID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveLike = (e) => {
    e.preventDefault();
    createLike(postID);
  };

  const unLikePost = (e) => {
    e.preventDefault();
    let id = likeID;
    unLike({ id, postID });
  };

  const handleLikeToggle = (e) => {
    if (!authID) {
      history.push("/login");
    }
    e.preventDefault();
    authLiked ? unLikePost(e) : saveLike(e);
  };

  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      onClick={handleLikeToggle}
    >
      <svg
        width="24"
        height="20"
        viewBox="0 0 24 20"
        fill={authLiked ? "#66DE93" : "none"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.9331 2.03374L14.9394 2.03986L14.9459 2.04574C16.1863 3.1722 17.8521 5.23723 19.3766 7.43657C20.9009 9.63565 22.2462 11.9145 22.8662 13.4533L22.8661 13.4533L22.8701 13.4625C22.9659 13.6873 23.1206 14.0973 23.254 14.5293C23.3896 14.9679 23.4869 15.3779 23.5 15.6352C23.4983 16.1723 23.3753 16.6832 23.1246 17.1755C22.7717 17.7837 22.2194 18.2715 21.572 18.5394C21.3468 18.6242 20.8634 18.7439 20.3966 18.8478C20.1687 18.8985 19.9561 18.9431 19.7991 18.9749C19.7205 18.9908 19.6566 19.0034 19.6122 19.0119C19.6023 19.0138 19.5936 19.0154 19.5861 19.0168H19.5831L19.5389 19.0248C17.8613 19.3285 15.0987 19.5 12.016 19.5C9.10815 19.5 6.46912 19.3319 4.75176 19.0846C4.74371 19.0824 4.73666 19.0806 4.73121 19.0793C4.70571 19.0729 4.67541 19.0664 4.64549 19.0601C4.58437 19.0474 4.49968 19.0308 4.40249 19.0118L4.40164 19.0117L4.3989 19.0111C4.20118 18.9725 3.93863 18.9212 3.6571 18.8605C3.06587 18.733 2.47779 18.5814 2.21136 18.4461C1.14705 17.9022 0.5 16.848 0.5 15.737V15.6336C0.514279 15.294 0.683067 14.7068 0.880791 14.1514C0.973683 13.8904 1.06642 13.6542 1.13804 13.482H1.14831L1.27791 13.1782C1.90069 11.7181 3.19858 9.5127 4.68171 7.36444C6.16617 5.21428 7.80165 3.17167 9.08434 2.01815L9.09284 2.0105L9.10095 2.00251L9.10096 2.0025L9.10097 2.00249L9.10098 2.00248L9.10121 2.00225L9.10241 2.00107L9.10764 1.99595L9.12879 1.97531C9.14741 1.95719 9.17476 1.93072 9.20899 1.89794C9.27756 1.83229 9.37326 1.74185 9.48164 1.64275C9.70488 1.43864 9.95938 1.21873 10.1409 1.09423L10.1489 1.08872L10.1567 1.0829C10.674 0.697565 11.3246 0.5 11.986 0.5C12.7199 0.5 13.3927 0.717735 13.9391 1.12132C13.9929 1.17184 14.0804 1.25012 14.1809 1.34012C14.2278 1.38209 14.2776 1.42661 14.3281 1.47205C14.5164 1.64149 14.7364 1.84216 14.9331 2.03374Z"
          stroke={authLiked ? "#66DE93" : "#939393"}
        />
      </svg>
      <div className="text-sm font-light text-green-400">
        {likesCount ? likesCount : null}
      </div>
    </div>
  );
};

export default BtnLike;
