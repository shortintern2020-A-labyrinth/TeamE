import React, { useState } from "react";
import styles from "./ProfilePage.module.css";
import ArtistsView from "./ArtistsView/ArtistsView";
import ProfileView from "./ProfileView/ProfileView";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditModal from "../EditModal/EditModal";

const ProfilePage = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);

  const onEditHandler = () => {
    setShowEditModal(true);
  };

  const onDeleteHandler = () => {};

  const favorites = [
    { name: "嵐" },
    { name: "Twice" },
    { name: "Ed Sheeran" },
    { name: "乃木坂46" },
    { name: "BTS" },
    { name: "King gnu" },
    { name: "Taylor Swift" },
  ];

  return (
    <div className={styles.container}>
      {showRegisterModal && <RegisterModal />}
      {showEditModal && <EditModal />}
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
  );
};

export default ProfilePage;
