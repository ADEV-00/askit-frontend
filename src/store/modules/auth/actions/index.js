import API_ROUTE from "../../../../api/api";
import axios from "axios";
import { history } from "../../../../routes";
import {
  BEFORE_STATE,
  BEFORE_USER_STATE,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
  FETCH_USER_ERROR,
  FETCH_USER_SUCCESS,
} from "../authTypes";
import setAuthToken from "../../../../api/authorization";

export const SignIn = (cred) => {
  return async (dispatch) => {
    dispatch({ type: BEFORE_STATE });
    try {
      const res = await axios.post(`${API_ROUTE}/login`, cred);
      //console.log(res.data);
      let userData = res.data;
      localStorage.setItem("token", userData.token);
      localStorage.setItem("user", JSON.stringify(userData));
      setAuthToken(userData.token);
      dispatch({ type: LOGIN_SUCCESS, payload: userData });
    } catch (err) {
      console.log(err.response.data.error);
      dispatch({ type: LOGIN_ERROR, payload: err.response.data.error });
    }
  };
};

export const SignOut = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    setAuthToken(false);
    dispatch({ type: LOGOUT_SUCCESS });
    //window.localStorage.clear();
    localStorage.removeItem("user");
    history.push("/login");
  };
};

export const SignUp = (newUser) => {
  return async (dispatch) => {
    dispatch({ type: BEFORE_STATE });
    try {
      await axios.post(`${API_ROUTE}/users`, newUser);
      dispatch({ type: SIGNUP_SUCCESS });
      history.push("/login");
    } catch (err) {
      dispatch({ type: SIGNUP_ERROR, payload: err.response.data.error });
    }
  };
};

export const getUser = (userID) => {
  return async (dispatch) => {
    dispatch({ type: BEFORE_USER_STATE });
    try {
      const res = await axios.get(`${API_ROUTE}/users/${userID}`);
      dispatch({ type: FETCH_USER_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: FETCH_USER_ERROR, payload: err });
    }
  };
};

export const updateUser = (updateDataUser, clearInput) => {
  return async (dispatch, getState) => {
    dispatch({ type: BEFORE_USER_STATE });
    const { currUser } = getState().Auth;
    try {
      const res = await axios.put(
        `${API_ROUTE}/users/${currUser.id}`,
        updateDataUser
      );
      let updatedUser = res.data;
      console.log(res.data);
      console.log("this is store", updatedUser);

      dispatch({ type: UPDATE_USER_SUCCESS, payload: updatedUser });
      window.localStorage.setItem("user", JSON.stringify(updatedUser)); //update the localstorages
      clearInput();
    } catch (err) {
      dispatch({ type: UPDATE_USER_ERROR, payload: err.response.data });
    }
  };
};
