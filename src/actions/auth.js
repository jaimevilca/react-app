import { types } from "../types/types";
import { LOGIN } from "../utils/constants";
import { post } from "../utils/axiosHandler";

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    const URL = LOGIN + "?username=" + email + "&password=" + password;
    const params = {
      username: email,
      password: password,
    };

    const success = ({ data }) => {
      const user = { ...data, isLoggedIn: true };
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(login(user));
    }
      
    post(URL, params, success, null, dispatch);
  };
};

export const logoutUser = () => {
  return (dispatch) => {
      dispatch(logout());
      localStorage.removeItem('user');
  };
};

export const login = (user) => ({
  type: types.login,
  payload: user,
});

export const logout = () => ({
  type: types.logout,
});
