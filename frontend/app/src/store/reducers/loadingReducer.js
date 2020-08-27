// Yuji Alves - Loading Reducer (Where store loadings infromation to Redux.)

import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  nextPage: "",
};

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case actionTypes.SET_NEXT_PAGE:
      return {
        ...state,
        nextPage: action.nextPage,
      };
  }
  return state;
};

export default loadingReducer;
