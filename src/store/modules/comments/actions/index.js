import API_ROUTE from "../../../../api/api";
import axios from "axios";
import { history } from "../../../../routes";
import {
  BEFORE_STATE_COMMENT,
  COMMENT_CREATE_ERROR,
  COMMENT_CREATE_SUCCESS,
  COMMENT_DELETE_ERROR,
  COMMENT_DELETE_SUCCESS,
  COMMENT_UPDATE_ERROR,
  COMMENT_UPDATE_SUCCESS,
  GET_COMMENTS_ERROR,
  GET_COMMENTS_SUCCESS,
} from "../commentTypes";

//Get all comments from the post
export const getComments = (id) => {
  return async (dispatch) => {
    dispatch({ type: BEFORE_STATE_COMMENT });

    try {
      const res = await axios.get(`${API_ROUTE}/comments/${id}`);
      dispatch({
        type: GET_COMMENTS_SUCCESS,
        payload: {
          postID: id,
          comments: res.data,
        },
      });
    } catch (err) {
      dispatch({ type: GET_COMMENTS_ERROR, payload: err });
    }
  };
};

//Create comment for the post
export const createComment = (commentData, commentSuccess) => {
  return async (dispatch) => {
    dispatch({ type: BEFORE_STATE_COMMENT });
    try {
      const res = await axios.post(
        `${API_ROUTE}/comments/${commentData.post_id}`,
        commentData
      );
      console.log(commentData);
      dispatch({
        type: COMMENT_CREATE_SUCCESS,
        payload: {
          postID: commentData.post_id,
          comment: res.data,
        },
      });
      commentSuccess();
      history.push(`/post/${commentData.post_id}`);
    } catch (err) {
      dispatch({
        type: COMMENT_CREATE_ERROR,
        payload: err,
      });
      console.log(err);
    }
  };
};

//Edit comment
export const updateComment = (updateCommentData, updateCommentSuccess) => {
  return async (dispatch) => {
    dispatch({ type: BEFORE_STATE_COMMENT });
    try {
      const res = await axios.put(
        `${API_ROUTE}/comments/${updateCommentData.id}`,
        updateCommentData
      );
      dispatch({
        type: COMMENT_UPDATE_SUCCESS,
        payload: {
          comment: res.data,
        },
      });
      updateCommentSuccess();
    } catch (err) {
      dispatch({
        type: COMMENT_UPDATE_ERROR,
        payload: err.response.data.error,
      });
    }
  };
};

//Delete the comment
export const deleteComment = (commentData, commentDeleteSuccess) => {
  return async (dispatch) => {
    dispatch({ type: BEFORE_STATE_COMMENT });
    try {
      await axios.delete(`${API_ROUTE}/comments/${commentData.id}`);
      dispatch({
        type: COMMENT_DELETE_SUCCESS,
        payload: {
          id: commentData.id,
          postID: commentData.postID,
        },
      });
      commentDeleteSuccess();
    } catch (err) {
      dispatch({
        type: COMMENT_DELETE_ERROR,
        payload: err.response.data.error,
      });
    }
  };
};
