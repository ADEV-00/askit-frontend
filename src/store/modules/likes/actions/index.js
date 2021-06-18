import API_ROUTE from "../../../../api/api";
import axios from "axios";
import {
  GET_LIKES_ERROR,
  GET_LIKES_SUCCESS,
  LIKE_CREATE_SUCCESS,
  LIKE_DELETE_ERROR,
  LIKE_DELETE_SUCCESS,
} from "../likeTypes";

//get all likes
export const fetchLikes = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`${API_ROUTE}/likes/${id}`);
      dispatch({
        type: GET_LIKES_SUCCESS,
        payload: {
          postID: id,
          likes: res.data,
        },
      });
    } catch (err) {
      dispatch({ type: GET_LIKES_ERROR, payload: err.response.data.error });
    }
  };
};

//Like post
export const likePost = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${API_ROUTE}/likes/${id}`);
      dispatch({
        type: LIKE_CREATE_SUCCESS,
        payload: {
          postID: id,
          oneLike: res.data,
        },
      });
    } catch (err) {
      dispatch({ type: LIKE_CREATE_SUCCESS, payload: err.response.data.error });
    }
  };
};

//Unlike Post
export const deleteLike = (likeData) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${API_ROUTE}/likes/${likeData.id}`);
      dispatch({
        type: LIKE_DELETE_SUCCESS,
        payload: {
          likeID: likeData.id,
          postID: likeData.postID,
        },
      });
    } catch (err) {
      dispatch({ type: LIKE_DELETE_ERROR, payload: err.response.data.error });
    }
  };
};
