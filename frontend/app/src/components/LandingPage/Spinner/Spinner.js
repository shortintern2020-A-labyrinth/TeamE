import React from "react";
import styles from "./Spinner.module.css";

const Spinner = (props) => {
  return (
    <div className={styles.container}>
      <img className={styles.img} src={require("./spinner.svg")} />
    </div>
  );
};

export default Spinner;
