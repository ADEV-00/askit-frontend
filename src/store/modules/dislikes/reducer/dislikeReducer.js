import {
  DISLIKE_CREATE_ERROR,
  DISLIKE_CREATE_SUCCESS,
  DISLIKE_DELETE_ERROR,
  DISLIKE_DELETE_SUCCESS,
  GET_DISLIKES_ERROR,
  GET_DISLIKES_SUCCESS,
} from "../dislikeTypes";

export const initState = {
  dislikeItems: [],
  dislikesError: null,
};

const dislikesReducer = (state = initState, action) => {
  const { payload, type } = action;
  switch (type) {
    case GET_DISLIKES_SUCCESS:
      return {
        ...state,
        dislikeItems: [
          ...state.dislikeItems,
          { postID: payload.postID, dislikes: payload.dislikes },
        ],
        dislikesError: null,
      };
    case GET_DISLIKES_ERROR:
      return {
        ...state,
        dislikesError: payload,
        dislikeItems: [],
      };
    case DISLIKE_CREATE_SUCCESS:
      return {
        ...state,
        dislikeItems: state.dislikeItems.map((dislikeItem) =>
          dislikeItem.postID === payload.postID
            ? {
                ...dislikeItem,
                dislikes: [...dislikeItem.dislikes, payload.oneDislike],
              }
            : dislikeItem
        ),
      };
    case DISLIKE_CREATE_ERROR:
      return {
        ...state,
        dislikesError: payload,
      };
    case DISLIKE_DELETE_SUCCESS:
      return {
        ...state,
        dislikeItems: state.dislikeItems.map((dislikeItem) =>
          Number(dislikeItem.postID) === payload.postID
            ? {
                ...dislikeItem,
                dislikes: dislikeItem.dislikes.filter(
                  ({ id }) => id !== payload.dislikeID
                ),
              }
            : dislikeItem
        ),
      };
    case DISLIKE_DELETE_ERROR:
      return {
        ...state,
        dislikesError: payload,
      };
    default:
      return state;
  }
};

export default dislikesReducer;
