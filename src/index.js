import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";

import setAuthToken from "./api/authorization";
import { LOGIN_SUCCESS } from "./store/modules/auth/authTypes";

import Routes from "./routes/index";
import store from "./store";

if (localStorage.token) {
  setAuthToken(localStorage.token);
  let userData =
    localStorage.getItem("user") == null
      ? null
      : JSON.parse(localStorage.getItem("user"));
  store.dispatch({ type: LOGIN_SUCCESS, payload: userData }); //provided he has a valid token
}

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
