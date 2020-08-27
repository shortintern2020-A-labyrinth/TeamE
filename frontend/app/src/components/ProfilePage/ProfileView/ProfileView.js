// Yuji Alves - Profile View Component

import React from "react";
import styles from "./ProfileView.module.css";

const ProfileView = (props) => {
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>Profile</h1>
        <div className={styles.profile}>
          <div className={styles.header}>
            <img
              src={props.userData.images && props.userData.images.url}
              className={styles.img}
            />
            <div className={styles.nameContainer}>
              <h2 className={styles.nameTitle}>Name</h2>
              <p className={styles.name}>{props.userData.user}</p>
            </div>
          </div>
          <div className={styles.followContainer}>
            <p className={styles.followTitle}>
              Following: {props.userData.following.length}
            </p>
            <p className={styles.followTitle}>
              Followers: {props.userData.followers.length}
            </p>
          </div>
          {props.readonly && (
            <div
              className={
                props.following ? styles.followBtnReverse : styles.followBtn
              }
              onClick={props.onClick}
            >
              {props.following ? "Unfollow" : "Follow"}
            </div>
          )}
          <div className={styles.introView}>
            <h3 className={styles.descriptionTitle}>Self Introduction</h3>
            {!props.readonly && (
              <i
                className={"far fa-edit fa-lg " + styles.icon}
                onClick={() => props.setShowModal(true)}
              ></i>
            )}
          </div>
          <p className={styles.description}>{props.userData.selfIntro}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
