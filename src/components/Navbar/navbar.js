import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const currState = useSelector((state) => state);
  const { isAuth, currUser } = currState.Auth;

  const userProfile = isAuth ? `/profile/${currUser.id}` : "";

  const UserSingOut = (
    <React.Fragment>
      <div className="flex flex-row space-x-6">
        <NavLink
          to="/signup"
          className="bg-yellow-400 py-2 px-5 rounded-md text-white font-bold"
        >
          Register
        </NavLink>
        <NavLink
          to="/login"
          className="bg-gray-200 py-2 px-5 rounded-md text-blue-500 font-bold"
        >
          Login
        </NavLink>
      </div>
    </React.Fragment>
  );
  const UserSignIn = (
    <React.Fragment>
      <div className="flex flex-row space-x-6 items-center">
        <NavLink
          to="/addpost"
          className="bg-yellow-400 py-3 px-3 rounded-lg text-white font-bold shadow-md lg:mr-10"
        >
          Ask a question
        </NavLink>
        <NavLink to={userProfile} className="font-bold text-gray-700">
          {currUser.firstname} {currUser.lastname}
        </NavLink>
        <NavLink
          to={userProfile}
          className="w-12 h-12 rounded-full bg-gray-500"
        ></NavLink>
      </div>
    </React.Fragment>
  );

  return (
    <div className="w-full bg-white h-20 shadow-sm flex flex-row justify-between items-center px-8">
      <Link to="/" className="font-bold text-2xl text-blue-500">
        Ask.It
      </Link>
      {isAuth ? UserSignIn : UserSingOut}
    </div>
  );
};

export default Navbar;
