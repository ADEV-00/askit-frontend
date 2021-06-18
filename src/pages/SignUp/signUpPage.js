import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { SignUp } from "../../store/modules/auth/actions";

//COmponents
import Navbar from "../../components/Navbar/navbar";

//Images
import image from "../../assets/images/login_img.png";

const SignUpPage = () => {
  const currState = useSelector((state) => state.Auth);
  const [user, setUser] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = React.useState(false);
  const passErr = "Passwords don't match";

  const dispatch = useDispatch();
  const createUser = (cred) => dispatch(SignUp(cred));

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const signUpUser = (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      setPasswordError(true);
    } else {
      createUser({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
      });
    }
  };

  if (currState.isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Navbar />
      <div className="w-full min-h-full flex flex-row justify-center">
        <div className="w-4/5 mt-8 md:px-28">
          <div className="font-bold text-lg">Join Ask.It Community</div>
          <div className="text-sm text-gray-600">
            Get more features and priviliges by joining to the most helpful
            community
          </div>
          <form onSubmit={signUpUser} className="my-5">
            {currState.signupError || passwordError ? (
              <div className="bg-red-400 py-5 px-3 rounded-lg text-white mb-3">
                {currState.signupError || passErr}
              </div>
            ) : (
              ""
            )}
            <div className="mb-5">
              <div className="mb-2 font-bold text-gray-700">Firstname:</div>
              <div className="bg-gray-200 py-3 px-5 rounded-md">
                <input
                  type="text"
                  placeholder="Enter your firstname"
                  className="bg-transparent w-full focus:outline-none"
                  name="firstname"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-5">
              <div className="mb-2 font-bold text-gray-700">Lastname:</div>
              <div className="bg-gray-200 py-3 px-5 rounded-md">
                <input
                  type="text"
                  placeholder="Enter your lastname"
                  className="bg-transparent w-full focus:outline-none"
                  name="lastname"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-5">
              <div className="mb-2 font-bold text-gray-700">Email:</div>
              <div className="bg-gray-200 py-3 px-5 rounded-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent w-full focus:outline-none"
                  name="email"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-5">
              <div className="mb-2 font-bold text-gray-700">Password:</div>
              <div className="bg-gray-200 py-3 px-5 rounded-md">
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="bg-transparent w-full focus:outline-none"
                  name="password"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-5">
              <div className="mb-2 font-bold text-gray-700">
                Confirm password:
              </div>
              <div className="bg-gray-200 py-3 px-5 rounded-md">
                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="bg-transparent w-full focus:outline-none"
                  name="confirmPassword"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="font-light">
              Already have an account{" "}
              <Link to="/login" className="font-bold text-blue-500">
                Login here
              </Link>
            </div>
            <div className="w-full flex justify-center mt-7">
              {currState.isLoading ? (
                <button
                  disabled
                  className="bg-yellow-400 text-white font-bold py-3 px-10 rounded-md w-full shadow-lg"
                >
                  CREATE FREE ACCOUNT...
                </button>
              ) : (
                <button className="bg-yellow-400 text-white font-bold py-3 px-10 rounded-md w-full shadow-lg">
                  CREATE FREE ACCOUNT
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

export default SignUpPage;
