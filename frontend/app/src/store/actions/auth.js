import * as actionTypes from "./actionTypes";

export const setToken = (token, refreshToken, expireDate) => {
  return {
    type: actionTypes.SET_TOKEN,
    token,
    refreshToken,
    expireDate,
  };
};
