import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { SignIn } from "../../store/modules/auth/actions";

//components
import Navbar from "../../components/Navbar/navbar";

//images
import image from "../../assets/images/login_img.png";

const LoginPage = () => {
  const currState = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const login = (cred) => dispatch(SignIn(cred));

  const hadnleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submitUser = (e) => {
    e.preventDefault();
    login({
      email: user.email,
      password: user.password,
    });
  };

  if (currState.isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Navbar />
      <div className="w-full min-h-full flex flex-row justify-center">
        <div className="w-4/5 mt-10 md:px-28 py-10">
          <div className="font-bold text-lg">
            Welcome Back to Ask.It Community
          </div>
          <div className="text-sm text-gray-600">
            Get more features and priviliges by joining to the most helpful
            community
          </div>
          <form onSubmit={submitUser} className="my-5">
            {currState.loginError ? (
              <div className="bg-red-400 py-5 px-3 rounded-lg text-white mb-3">
                {currState.loginError}
              </div>
            ) : (
              ""
            )}
            <div className="mb-5">
              <div className="mb-2 font-bold text-gray-700">Email:</div>
              <div className="bg-gray-200 py-3 px-5 rounded-md">
                <input
                  type="email"
                  placeholder="Enter your Email:"
                  className="bg-transparent  w-full focus:outline-none"
                  name="email"
                  onChange={hadnleChange}
                />
              </div>
            </div>
            <div className="mb-5">
              <div className="mb-2 font-bold text-gray-700">Password:</div>
              <div></div>
              <div className="bg-gray-200 py-3 px-5 rounded-md">
                <input
                  type="password"
                  placeholder="Enter your password:"
                  className="bg-transparent w-full focus:outline-none "
                  name="password"
                  onChange={hadnleChange}
                  pattern=".{5,}"
                  title="5 characters minimum"
                />
              </div>
            </div>
            <div className="font-light">
              New to Ask.it?{" "}
              <Link to="/signup" className="font-bold text-blue-500">
                Sign up now
              </Link>
            </div>
            <div className="w-full flex justify-center mt-7">
              {currState.isLoading ? (
                <button
                  disabled
                  className="bg-yellow-400 text-white font-bold py-3 px-10 rounded-md w-full shadow-lg"
                >
                  Login...
                </button>
              ) : (
                <button className="bg-yellow-400 text-white font-bold py-3 px-10 rounded-md w-full shadow-lg">
                  Login
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="hidden lg:block w-5/6 h-full">
          <img src={image} alt="Login" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
