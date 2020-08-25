import * as actionTypes from "./actionTypes";

export const setToken = (token, refreshToken, expiresIn) => {
  return {
    type: actionTypes.SET_TOKEN,
    token,
    refreshToken,
    expiresIn,
  };
};
