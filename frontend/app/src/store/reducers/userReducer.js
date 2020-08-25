import * as actionTypes from "../actions/actionTypes";

const initialState = {
  user: "",
  email: "",
  followers: [],
  following: [],
  spotifyID: "",
  images: "",
  likedArtists: [],
  selfIntro: "",
};

const userReducer = (state = initialState, action) => {
  console.log(action.userData);
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
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

export default userReducer;
