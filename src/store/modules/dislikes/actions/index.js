import API_ROUTE from "../../../../api/api";
import axios from "axios";
import {
  DISLIKE_CREATE_ERROR,
  DISLIKE_CREATE_SUCCESS,
  DISLIKE_DELETE_ERROR,
  DISLIKE_DELETE_SUCCESS,
  GET_DISLIKES_ERROR,
  GET_DISLIKES_SUCCESS,
} from "../dislikeTypes";
//Get all dislikes
export const fetchDislikes = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`${API_ROUTE}/dislikes/${id}`);
      dispatch({
        type: GET_DISLIKES_SUCCESS,
        payload: {
          postID: id,
          dislikes: res.data,
        },
      });
    } catch (err) {
      dispatch({ type: GET_DISLIKES_ERROR, payload: err.response.data.error });
    }
  };
};

//Dislike post
export const dislikePost = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${API_ROUTE}/dislikes/${id}`);
      console.log(res);
      dispatch({
        type: DISLIKE_CREATE_SUCCESS,
        payload: {
          postID: id,
          oneDislike: res.data,
        },
      });
    } catch (err) {
      dispatch({
        type: DISLIKE_CREATE_ERROR,
        payload: err,
      });
    }
  };
};

//Undislike post
export const deleteDislike = (dislikeData) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${API_ROUTE}/dislikes/${dislikeData.id}`);
      dispatch({
        type: DISLIKE_DELETE_SUCCESS,
        payload: {
          dislikeID: dislikeData.id,
          postID: dislikeData.postID,
        },
      });
    } catch (err) {
      dispatch({
        type: DISLIKE_DELETE_ERROR,
        payload: err,
      });
    }
  };
};
