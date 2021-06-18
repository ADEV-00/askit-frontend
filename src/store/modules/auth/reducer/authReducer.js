import {
  BEFORE_STATE,
  BEFORE_USER_STATE,
  FETCH_USER_ERROR,
  FETCH_USER_SUCCESS,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
} from "../authTypes";

export const initState = {
  isAuth: false,
  currUser: {},
  isLoading: false,
  isUpdateingUser: false,
  authError: null,
  authSuccess: null,
  user: {},
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case BEFORE_STATE:
      return {
        ...state,
        authError: null,
        isLoading: true,
      };
    case BEFORE_USER_STATE:
      return {
        ...state,
        userError: null,
        isUpdateingUser: true,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        signupError: null,
        loginError: null,
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        isLoading: false,
        signupError: action.payload,
        loginError: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currUser: action.payload,
        isAuth: action.payload,
        loginError: null,
        signupError: null,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        loginError: action.payload,
        signupError: null,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuth: false,
        currUser: {},
        logoutError: null,
        isLoading: false,
        signupError: null,
        loginError: null,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        userError: null,
        isLoading: false,
        user: action.payload,
      };
    case FETCH_USER_ERROR:
      return {
        ...state,
        userError: action.payload,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isUpdateingUser: false,
        currUser: action.payload,
        userError: null,
        authSuccessUser: "User Updated",
      };
    case UPDATE_USER_ERROR: {
      return {
        ...state,
        isUpdateingUser: false,
        userError: action.payload,
      };
    }
    default:
      return state;
  }
};
export default authReducer;
