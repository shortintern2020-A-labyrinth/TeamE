import * as actionTypes from "./actionTypes";

export const setLikedArtists = (likedArtists) => {
  return {
    type: actionTypes.SET_LIKED_ARTISTS,
    likedArtists,
  };
};

export const setUser = (userData) => {
  return {
    type: actionTypes.SET_USER,
    userData,
  };
};
