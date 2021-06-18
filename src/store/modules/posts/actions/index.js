import API_ROUTE from "../../../../api/api";
import axios from "axios";
import { history } from "../../../../routes";
import {
  BEFORE_STATE_POST,
  CREATE_POST_ERROR,
  CREATE_POST_SUCCESS,
  DELETE_POST_ERROR,
  DELETE_POST_SUCCESS,
  FETCH_AUTH_POSTS,
  FETCH_AUTH_POSTS_ERROR,
  FETCH_POSTS,
  FETCH_POSTS_ERROR,
  FETCH_POST_ERROR,
  FETCH_POST_SUCCESS,
  UPDATE_POST_ERROR,
  UPDATE_POST_SUCCESS,
} from "../postTypes";

//Get all posts
export const fetchPosts = () => {
  return async (dispatch) => {
    dispatch({ type: BEFORE_STATE_POST });
    try {
      const res = await axios.get(`${API_ROUTE}/posts`);
      dispatch({ type: FETCH_POSTS, payload: res.data });
    } catch (err) {
      dispatch({
        type: FETCH_POSTS_ERROR,
        payload: err.response ? err.response.data.error : "",
      });
    }
  };
};

//Get post
export const fetchPost = (id) => {
  return async (dispatch) => {
    dispatch({ type: BEFORE_STATE_POST });
    try {
      const res = await axios.get(`${API_ROUTE}/posts/${id}`);
      dispatch({ type: FETCH_POST_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: FETCH_POST_ERROR, payload: err.response.data.error });
      history.push("/pagenotfound");
    }
  };
};

//Fetch user post
export const fetchAuthPosts = (id) => {
  return async (dispatch) => {
    dispatch({ type: BEFORE_STATE_POST });
    try {
      const res = await axios.get(`${API_ROUTE}/user_posts/${id}`);
      dispatch({ type: FETCH_AUTH_POSTS, payload: res.data });
    } catch (err) {
      dispatch({
        type: FETCH_AUTH_POSTS_ERROR,
        payload: err.response.data.error,
      });
    }
  };
};

//Create new post
export const createPost = (postData) => {
  return async (dispatch) => {
    dispatch({ type: BEFORE_STATE_POST });
    try {
      const res = await axios.post(`${API_ROUTE}/posts`, postData);

      dispatch({
        type: CREATE_POST_SUCCESS,
        payload: res.data,
      });
      //Redirect to post page
      history.push(`/post/${res.data.id}`);
    } catch (err) {
      dispatch({ type: CREATE_POST_ERROR, payload: err.response.data.error });
    }
  };
};

//Edit post
export const updatePost = (updatePostData, updateSuccess) => {
  return async (dispatch) => {
    dispatch({ type: BEFORE_STATE_POST });
    try {
      console.log(updatePostData);
      const res = await axios.put(
        `${API_ROUTE}/posts/${updatePostData.id}`,
        updatePostData
      );
      dispatch({
        type: UPDATE_POST_SUCCESS,
        payload: res.data,
      });
      updateSuccess();
    } catch (err) {
      dispatch({ type: UPDATE_POST_ERROR, payload: err.response.data.error });
    }
  };
};

//Delete post
export const deletePost = (id) => {
  return async (dispatch) => {
    dispatch({ type: BEFORE_STATE_POST });
    try {
      const res = await axios.delete(`${API_ROUTE}/posts/${id}`);
      dispatch({
        type: DELETE_POST_SUCCESS,
        payload: {
          deleteID: id,
          message: res.data.response,
        },
      });
      history.push("/");
    } catch (err) {
      dispatch({ type: DELETE_POST_ERROR, payload: err });
    }
  };
};
