import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import LoginPage from "../pages/Login/loginPage";
import HomePage from "../pages/Home/homePage";
import SignUpPage from "../pages/SignUp/signUpPage";
import ProfilePage from "../pages/Profile/profilePage";
import PageNotFound from "../pages/PageNotFound/pageNofFound";
import CreatePostPage from "../pages/CreatePost/createPostPage";
import EditPostPage from "../pages/EditPost/editPostPage";
import PostDetailsPage from "../pages/PostDetails/postDetailsPage";

export const history = createBrowserHistory();

const Routes = () => {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/profile/:id" component={ProfilePage} />
          <Route path="/pagenotfound" component={PageNotFound} />
          <Route path="/addpost" component={CreatePostPage} />
          <Route path="/editpost/:id" component={EditPostPage} />
          <Route path="/post/:id" component={PostDetailsPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
