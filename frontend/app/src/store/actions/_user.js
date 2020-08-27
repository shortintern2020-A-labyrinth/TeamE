// Yuji Alves - Redux Action of readonly user.

import * as actionTypes from "./actionTypes";
import axios from "axios";
import * as loadingAction from "./loading";
import { baseURL } from "../../constants/baseUrl";

export const getUser = (userID) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${baseURL}/user/${userID}`);
      if (response.status === 200) {
        const data = await response.data;
        dispatch(setUserToShow(data));
        dispatch(loadingAction.setFollowLoading(false));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const setUserToShow = (userData) => {
  return {
    type: actionTypes.SET_USER_TO_SHOW,
    userData,
  };
};
