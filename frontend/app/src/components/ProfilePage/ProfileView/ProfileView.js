import React from "react";
import styles from "./ProfileView.module.css";

const ProfileView = (props) => {
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>Profile</h1>
        <div className={styles.profile}>
          <div className={styles.header}>
            <img src={props.imgSrc} className={styles.img} />
            <h2 className={styles.name}>{props.name}</h2>
          </div>
          <p className={styles.description}>{props.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
