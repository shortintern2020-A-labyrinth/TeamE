import React from "react";
import styles from "./FFUser.module.css";

const FFUser = (props) => {
  return (
    <div>
      <div className={styles.container}>
        <img className={styles.image} src={props.images && props.images.url} />
        <p className={styles.name}>{props.name}</p>
      </div>
      <hr />
    </div>
  );
};

export default FFUser;
