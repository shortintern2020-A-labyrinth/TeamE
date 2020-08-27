// Yuji Alves - Redux Action of artist information.

import * as actionTypes from "./actionTypes";

export const setArtist = (id, name) => {
  return {
    type: actionTypes.SET_ARTIST,
    id,
    name,
  };
};
