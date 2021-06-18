import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser, updateUser, SignOut } from "../../store/modules/auth/actions";
//components
import BtnEdit from "../utils/BtnEdit";
import BtnLogout from "../utils/BtnLogout";

const ProfileCard = ({ profileID }) => {
  const currState = useSelector((state) => state);
  const [editActive, setEditActive] = React.useState(false);
  const [userUpdate, setUserUpdate] = React.useState({
    firstname: currState.Auth.user.firstname,
    lastname: currState.Auth.user.lastname,
    email: currState.Auth.user.email,
    password: "",
  });
  const currUser = currState.Auth;
  const authID = currState.Auth.currUser ? currState.Auth.currUser.id : "";

  const dispatch = useDispatch();

  const fetchUserData = (id) => dispatch(getUser(id));
  const editProfile = (userData) => dispatch(updateUser(userData, clearInput));
  const logout = () => dispatch(SignOut());

  const clearInput = () => {
    setEditActive(false);
    window.location.reload();
  };

  const handleChange = (e) => {
    setUserUpdate({
      ...userUpdate,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    fetchUserData(profileID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitUser = (e) => {
    e.preventDefault();
    editProfile({
      firstname: userUpdate.firstname,
      lastname: userUpdate.lastname,
      email: userUpdate.email,
      password: userUpdate.password,
    });
  };

  const logoutUser = (e) => {
    e.preventDefault();
    logout();
  };

  const user = currState.Auth.user;

  return (
    <div className="bg-white w-4/5  min-h-60 shadow-sm rounded-lg border-2 cursor-pointer lg:w-3/5 xl:w-2/4  p-5">
      <div className="w-full h-full flex space-x-4">
        <div className="h-full w-52 bg-gray-600 rounded-md"></div>
        <form
          onSubmit={submitUser}
          className="flex flex-row justify-between flex-1"
        >
          <div>
            {currState.Auth.userError ? (
              <div className="text-red-500">
                {currState.Auth.userError.error}
              </div>
            ) : (
              ""
            )}
            <div>
              <div className="text-gray-800 font-bold">Firstname:</div>
              {!editActive ? (
                <div className="font-bold text-blue-500">{user.firstname}</div>
              ) : (
                <div className="border-2 border-gray-300 py-1 px-2 rounded-md ">
                  <input
                    className="w-full outline-none"
                    type="text"
                    value={userUpdate.firstname}
                    name="firstname"
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>
            <div>
              <div className="text-gray-800 font-bold">Lastname:</div>
              {!editActive ? (
                <div className="font-bold text-blue-500">{user.lastname}</div>
              ) : (
                <div className="border-2 border-gray-300 py-1 px-2 rounded-md ">
                  <input
                    className="w-full outline-none"
                    type="text"
                    value={userUpdate.lastname}
                    name="lastname"
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>
            <div>
              <div className="text-gray-800 font-bold">Email:</div>
              {!editActive ? (
                <div className="font-bold text-blue-500">{user.email}</div>
              ) : (
                <div className="border-2 border-gray-300 py-1 px-2 rounded-md ">
                  <input
                    className="w-full outline-none"
                    type="text"
                    value={userUpdate.email}
                    name="email"
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>
            <div>
              {editActive ? (
                <>
                  <div className="text-gray-800 font-bold">
                    Set new password:
                  </div>
                  <div className="border-2 border-gray-300 py-1 px-2 rounded-md ">
                    <input
                      className="w-full outline-none"
                      type="text"
                      name="password"
                      onChange={handleChange}
                    />
                  </div>
                </>
              ) : null}
            </div>
          </div>
          {user.id === authID ? (
            <>
              {!editActive ? (
                <div className="flex space-x-2">
                  <div
                    onClick={() => setEditActive(true)}
                    className="bg-yellow-500 h-10 w-10 flex justify-center items-center rounded-lg"
                  >
                    <BtnEdit />
                  </div>
                  <div
                    onClick={logoutUser}
                    className="bg-blue-500 pl-1 h-10 w-10 flex justify-center items-center rounded-lg"
                  >
                    <BtnLogout />
                  </div>
                </div>
              ) : (
                <div className="flex flex-row space-x-2">
                  <button
                    type="submit"
                    className="py-2 px-3 h-10 rounded-md text-white  bg-blue-500"
                  >
                    Update
                  </button>
                  <div
                    onClick={() => setEditActive(false)}
                    className="py-2 px-3 h-10 rounded-md text-yellow-400 font-bold"
                  >
                    Cancel
                  </div>
                </div>
              )}
            </>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default ProfileCard;
