import * as actionTypes from "../actions/actionTypes";

const initialState = {
  userID: "",
  user: "",
  email: "",
  followers: [],
  following: [],
  spotifyID: "",
  images: "",
  likedArtists: [],
  selfIntro: "",
};

const _userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_TO_SHOW:
      return {
        ...state,
        userID: action.userData._id,
        user: action.userData.uname,
        email: action.userData.email,
        followers: action.userData.followers,
        following: action.userData.following,
        spotifyID: action.userData.spotify_id,
        images: action.userData.profile_pic,
        likedArtists: action.userData.liked_artists,
        selfIntro: action.userData.self_intro,
      };
  }
  return state;
};

export default _userReducer;
