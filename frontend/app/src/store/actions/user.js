import * as actionTypes from "./actionTypes";

export const setUser = (userData) => {
  return {
    type: actionTypes.SET_USER,
    userData,
  };
};
