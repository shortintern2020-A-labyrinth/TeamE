// Yuji Alves - Auth Reducer (Where store authentication infromation to Redux.)

import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: "",
  refreshToken: "",
  expiresIn: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.token,
        refreshToken: action.refreshToken,
        expiresIn: action.expiresIn,
      };
  }
  return state;
};

export default authReducer;
