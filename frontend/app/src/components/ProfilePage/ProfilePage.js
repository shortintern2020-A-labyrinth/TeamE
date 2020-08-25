import React, { useState } from "react";
import styles from "./ProfilePage.module.css";
import ArtistsView from "./ArtistsView/ArtistsView";
import ProfileView from "./ProfileView/ProfileView";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditModal from "../EditModal/EditModal";
import GlobalMenu from "../ArtistListPage/GlobalMenu/GlobalMenu";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const userData = useSelector((state) => state.user);

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

  const onDeleteHandler = () => {};

  const favorites = [];

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
          imgSrc={userData.images}
        />
        <ArtistsView
          favorites={favorites}
          onEdit={onEditHandler}
          onDelete={() => {}}
          onAdd={() => setShowRegisterModal(true)}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
