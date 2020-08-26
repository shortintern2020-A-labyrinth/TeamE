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
            <div className={styles.nameContainer}>
              <h2 className={styles.nameTitle}>Name</h2>
              <p className={styles.name}>{props.name}</p>
            </div>
          </div>
          <div className={styles.introView}>
            <h3 className={styles.descriptionTitle}>Self Introduction</h3>
            {!props.readonly && (
              <i
                className={"far fa-edit fa-lg " + styles.icon}
                onClick={() => props.setShowModal(true)}
              ></i>
            )}
          </div>
          <p className={styles.description}>{props.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
