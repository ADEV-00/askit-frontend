import { combineReducers } from "redux";
import authReducer from "./auth/reducer/authReducer";
import commentReducer from "./comments/reducer/commentReducer";
import dislikesReducer from "./dislikes/reducer/dislikeReducer";
import likesReducer from "./likes/reducer/likeReducer";
import postsState from "./posts/reducer/postReducer";

const reducer = combineReducers({
  Auth: authReducer,
  CommentsState: commentReducer,
  LikesState: likesReducer,
  DislikesState: dislikesReducer,
  PostsState: postsState,
});

export default reducer;
