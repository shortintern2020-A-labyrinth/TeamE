import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: "",
  refreshToken: "",
  expireDate: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.token,
        refreshToken: action.refreshToken,
        expireDate: action.expireDate,
      };
  }
  return state;
};

export default authReducer;
