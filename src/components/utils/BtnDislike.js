import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../../routes";
import {
  fetchDislikes,
  dislikePost,
  deleteDislike,
} from "../../store/modules/dislikes/actions";

const BtnDislike = ({ postID }) => {
  const currState = useSelector((state) => state);
  const currPostDislike = currState.DislikesState;
  const authID = currState.Auth.currUser ? currState.Auth.currUser.id : "";

  const dispatch = useDispatch();

  let dislikesCount = 0;
  let dislikeID = null;
  let authDislike = false;

  if (currPostDislike) {
    // eslint-disable-next-line array-callback-return
    currPostDislike.dislikeItems.map((item) => {
      if (item.postID === postID) {
        dislikesCount = item.dislikes.length;

        // eslint-disable-next-line array-callback-return
        item.dislikes.map((dislike) => {
          if (dislike.user_id === authID) {
            authDislike = true;
            dislikeID = dislike.id;
          }
        });
      }
    });
  }

  const getDislikes = (id) => dispatch(fetchDislikes(id));
  const createDislike = (id) => dispatch(dislikePost(id));
  const unDislike = (dislikeData) => dispatch(deleteDislike(dislikeData));

  useEffect(() => {
    getDislikes(postID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveDislike = (e) => {
    e.preventDefault();
    createDislike(postID);
  };

  const unDislikePost = (e) => {
    e.preventDefault();
    let id = dislikeID;
    unDislike({ id, postID });
  };

  const handleDislikeToggle = (e) => {
    if (!authID) {
      history.push("/login");
    }
    e.preventDefault();
    authDislike ? unDislikePost(e) : saveDislike(e);
  };

  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      onClick={handleDislikeToggle}
    >
      <div className="text-sm font-light text-red-400">
        {dislikesCount ? dislikesCount : null}
      </div>
      <svg
        width="24"
        height="20"
        viewBox="0 0 24 20"
        fill={authDislike ? "#D83A56" : "none"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.0669 17.9663L9.06063 17.9601L9.05414 17.9543C7.81373 16.8278 6.14793 14.7628 4.62343 12.5634C3.09912 10.3644 1.75379 8.08546 1.13377 6.54669L1.13386 6.54666L1.12995 6.53747C1.03411 6.31267 0.879445 5.90271 0.745962 5.47074C0.610427 5.03214 0.513125 4.6221 0.500018 4.36477C0.501712 3.82765 0.624658 3.31684 0.875356 2.8245C1.22829 2.2163 1.78061 1.72848 2.42802 1.46058C2.65325 1.37575 3.13659 1.25613 3.6034 1.1522C3.83125 1.10148 4.04391 1.0569 4.20095 1.02508C4.27952 1.00916 4.34341 0.99659 4.38778 0.988128C4.39773 0.98623 4.40644 0.984589 4.41392 0.983195H4.41689L4.46107 0.975198C6.13869 0.671493 8.90131 0.5 11.984 0.5C14.8919 0.5 17.5309 0.668124 19.2483 0.915428C19.2563 0.91761 19.2633 0.91939 19.2688 0.920741C19.2943 0.92706 19.3246 0.933628 19.3545 0.939867C19.4158 0.952651 19.5008 0.969267 19.5983 0.988334L19.5984 0.988337L19.6012 0.988892C19.7989 1.02754 20.0614 1.07886 20.3429 1.13953C20.9343 1.26701 21.5226 1.41866 21.7889 1.55407C22.853 2.09799 23.5 3.15204 23.5 4.26303V4.36647C23.4857 4.70601 23.3169 5.29324 23.1192 5.84863C23.0263 6.10956 22.9336 6.34578 22.862 6.51802H22.8517L22.7221 6.82185C22.0993 8.2819 20.8014 10.4873 19.3183 12.6356C17.8338 14.7857 16.1983 16.8283 14.9157 17.9819L14.9072 17.9895L14.899 17.9975L14.899 17.9975L14.8988 17.9977L14.8976 17.9989L14.8924 18.0041L14.8712 18.0247C14.8526 18.0428 14.8252 18.0693 14.791 18.1021C14.7224 18.1677 14.6267 18.2581 14.5184 18.3572C14.2951 18.5614 14.0406 18.7813 13.8591 18.9058L13.8511 18.9113L13.8433 18.9171C13.326 19.3024 12.6754 19.5 12.014 19.5C11.2801 19.5 10.6074 19.2823 10.0609 18.8787C10.0071 18.8282 9.91964 18.7499 9.81909 18.6599C9.77218 18.6179 9.72243 18.5734 9.67191 18.5279C9.48357 18.3585 9.26356 18.1578 9.0669 17.9663Z"
          stroke={authDislike ? "#D83A56" : "#939393"}
        />
      </svg>
    </div>
  );
};

export default BtnDislike;
//#D83A56
