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
      dispatch(loadingActions.setLoading(false));
      // dispatch ユーザー情報登録
      if (response.status === 200) {
        if (response.data.liked_artists.length) {
          dispatch(loadingActions.setNextPage("profile"));
        } else {
          dispatch(loadingActions.setNextPage("artists"));
        }
        return dispatch(userActions.setUser(response.data));
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
