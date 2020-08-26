import React, { useState } from "react";
import styles from "./IntroModal.module.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import * as userActions from "../../../store/actions/user";

const IntroModal = (props) => {
  const dispatch = useDispatch();

  const userID = useSelector((state) => state.user.userID);
  const token = useSelector((state) => state.auth.token);

  const [text, setText] = useState("");

  const onSaveHandler = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/user/${userID}/self-intro`,
        { message: text },
        {
          headers: {
            access_token: token,
          },
        }
      );
      if (response.status === 200) {
        const resData = await response.data;
        dispatch(userActions.setSelfIntro(resData.self_intro));
      }
    } catch (err) {
      console.log(err);
    }
    props.onBlur();
  };

  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        <h1 className={styles.headerTitle}>Introduction</h1>
        <div className={styles.textContainer}>
          <textarea
            value={text}
            onChange={(input) => setText(input.target.value)}
            className={styles.text}
          ></textarea>
        </div>
        <div className={styles.btnContainer}>
          <p className={styles.btn} onClick={props.onBlur}>
            Cancel
          </p>
          <p className={styles.btn} onClick={onSaveHandler}>
            Save
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroModal;
