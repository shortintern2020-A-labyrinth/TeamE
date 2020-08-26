import React, { useState, useEffect } from "react";
import styles from "./ProfilePage.module.css";
import ArtistsView from "./ArtistsView/ArtistsView";
import ProfileView from "./ProfileView/ProfileView";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditModal from "../EditModal/EditModal";
import GlobalMenu from "../ArtistListPage/GlobalMenu/GlobalMenu";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import * as userActions from "../../store/actions/user";
import * as _userActions from "../../store/actions/_user";
import IntroModal from "./IntroModal/IntroModal";

const ProfilePage = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const _userData = useSelector((state) => state._user);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (props.readonly) {
      dispatch(_userActions.getUser(props.match.params.userID));
    }
  }, [dispatch]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showIntroModal, setShowIntroModal] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);

  const onEditHandler = (artist) => {
    setSelectedArtist(artist);
    setShowEditModal(true);
  };

  const onBlurHandler = () => {
    setShowEditModal(false);
    setShowRegisterModal(false);
    setShowIntroModal(false);
  };

  const onDeleteHandler = async (artist) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/user/${userData.userID}/favorites?aid=${artist.id}`,
        {
          headers: {
            access_token: token,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        const likedArtists = await response.data;
        dispatch(userActions.setLikedArtists(likedArtists));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <GlobalMenu />
      {showRegisterModal && <RegisterModal onBlur={onBlurHandler} />}
      {showEditModal && (
        <EditModal onBlur={onBlurHandler} artist={selectedArtist} />
      )}
      {showIntroModal && (
        <IntroModal onBlur={onBlurHandler} intro={userData.selfIntro} />
      )}
      <div className={styles.container}>
        <ProfileView
          name={props.readonly ? _userData.user : userData.user}
          description={
            props.readonly ? _userData.selfIntro : userData.selfIntro
          }
          imgSrc={
            props.readonly
              ? _userData.images && _userData.images.url
              : userData.images && userData.images.url
          }
          setShowModal={setShowIntroModal}
          readonly={props.readonly}
        />
        <ArtistsView
          favorites={
            props.readonly ? _userData.likedArtists : userData.likedArtists
          }
          onEdit={onEditHandler}
          onDelete={onDeleteHandler}
          onAdd={() => setShowRegisterModal(true)}
          readonly={props.readonly}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
