import { types } from "../types/types";

export const authReducer = (state = {isLoggedIn: false}, action) => {
  switch (action.type) {
    case types.login:
      return action.payload;

    case types.logout:
      return {isLoggedIn: false};

    default:
      return state;
  }
};
