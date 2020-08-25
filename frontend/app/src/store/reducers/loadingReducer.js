import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
};

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
  }
  return state;
};

export default loadingReducer;
