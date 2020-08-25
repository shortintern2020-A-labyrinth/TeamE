import React, { useState } from "react";
import styles from "./ProfilePage.module.css";
import ArtistsView from "./ArtistsView/ArtistsView";
import ProfileView from "./ProfileView/ProfileView";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditModal from "../EditModal/EditModal";
import GlobalMenu from "../ArtistListPage/GlobalMenu/GlobalMenu";

const ProfilePage = () => {
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
          name="楽天パンダ"
          description="都内の大学生です！幅広く聞きます！よろしくお願いします！"
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
