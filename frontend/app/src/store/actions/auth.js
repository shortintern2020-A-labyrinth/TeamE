// Yuji Alves - Redux Action of authentication information and login function.

import * as actionTypes from "./actionTypes";
import * as loadingActions from "./loading";
import * as userActions from "./user";
import axios from "axios";

export const login = (token, refreshToken, expiresIn) => {
  return async (dispatch) => {
    dispatch(loadingActions.setLoading(true));
    dispatch(setToken(token, refreshToken, expiresIn));
    // ユーザー情報をリクエスト
    try {
      const response = await axios.get("http://localhost:3000/user/login", {
        headers: {
          access_token: token,
        },
      });
      // dispatch ユーザー情報登録
      if (response.status === 200) {
        const data = await response.data;
        if (data.liked_artists.length === 0) {
          dispatch(loadingActions.setNextPage("profile"));
          dispatch(loadingActions.setLoading(false));
        } else {
          dispatch(loadingActions.setNextPage("artists"));
          dispatch(loadingActions.setLoading(false));
        }
        return dispatch(userActions.setUser(data));
      }
    } catch (err) {
      console.log(err);
      dispatch(loadingActions.setLoading(false));
    }
  };
};

const setToken = (token, refreshToken, expiresIn) => {
  return {
    type: actionTypes.SET_TOKEN,
    token,
    refreshToken,
    expiresIn,
  };
};
