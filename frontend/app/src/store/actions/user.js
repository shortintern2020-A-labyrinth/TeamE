import * as actionTypes from "./actionTypes";

export const setSelfIntro = (selfIntro) => {
  return {
    type: actionTypes.SET_SELF_INTRO,
    selfIntro,
  };
};

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
