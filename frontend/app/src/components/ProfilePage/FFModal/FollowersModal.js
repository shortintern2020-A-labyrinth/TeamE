import React, { useState } from "react";
import styles from "./FF.module.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import * as userActions from "../../../store/actions/user";
import FFUser from './FFUser/FFUser';

const FollowersModal = (props) => {
  const dispatch = useDispatch();

  const userID = useSelector((state) => state.user.userID);
  const token = useSelector((state) => state.auth.token);

  console.log(props.followwers);


  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        <h1 className={styles.headerTitle}>Followers List</h1>
        {props.followers.map((user, index) => (
          <FFUser 
            name={user.name}
            image={user.image}
            key={index}
          />
        ))}

        <div className={styles.btnContainer}>
          <p className={styles.btn} onClick={props.onBlur}>
            Close
          </p>
        </div>
      </div>
    </div>
  );
};

export default FollowersModal;
