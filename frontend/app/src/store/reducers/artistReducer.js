// Yuji Alves - Artist Reducer (Where store artist infromation to Redux.)

import * as actionTypes from "../actions/actionTypes";

const initialState = {
  id: "",
  name: "",
};

const artistReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ARTIST:
      return {
        ...state,
        id: action.id,
        name: action.name,
      };
  }
  return state;
};

export default artistReducer;
