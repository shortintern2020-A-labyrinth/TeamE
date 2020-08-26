import * as actionTypes from "./actionTypes";
import axios from "axios";

export const getUser = (userID) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3000/user/${userID}`);
      if (response.status === 200) {
        const data = await response.data;
        return dispatch(setUserToShow(data));
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
