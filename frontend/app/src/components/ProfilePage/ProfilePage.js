import React from "react";
import styles from "./ProfilePage.module.css";
import ArtistsView from "./ArtistsView/ArtistsView";
import ProfileView from "./ProfileView/ProfileView";

const ProfilePage = () => {
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
      <ProfileView
        name="楽天パンダ"
        description="都内の大学生です！幅広く聞きます！よろしくお願いします！"
      />
      <ArtistsView
        favorites={favorites}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    </div>
  );
};

export default ProfilePage;
