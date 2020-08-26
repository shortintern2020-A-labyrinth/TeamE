import React, { useState } from "react";
import styles from "./ProfilePage.module.css";
import ArtistsView from "./ArtistsView/ArtistsView";
import ProfileView from "./ProfileView/ProfileView";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditModal from "../EditModal/EditModal";
import GlobalMenu from "../ArtistListPage/GlobalMenu/GlobalMenu";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import * as userActions from "../../store/actions/user";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const token = useSelector((state) => state.auth.token);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);

  const onEditHandler = (artist) => {
    setSelectedArtist(artist);
    setShowEditModal(true);
  };

  const onBlurHandler = () => {
    setShowEditModal(false);
    setShowRegisterModal(false);
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
      <div className={styles.container}>
        <ProfileView
          name={userData.user}
          description={userData.selfIntro}
          imgSrc={userData.images.url}
        />
        <ArtistsView
          favorites={userData.likedArtists}
          onEdit={onEditHandler}
          onDelete={onDeleteHandler}
          onAdd={() => setShowRegisterModal(true)}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
