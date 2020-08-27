/*
Author     : Masaki Miura
Contents   : Landing Page
*/

import React, { useEffect } from "react";
import styles from "./LandingPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../../store/actions/auth";
import { getParam } from "../../utils/utils";
import Spinner from "./Spinner/Spinner";
import { Redirect } from "react-router";
import { baseURL } from "../../constants/baseUrl";

const LandingPage = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => {
    return state.loading.loading;
  });
  const nextPage = useSelector((state) => {
    return state.loading.nextPage;
  });

  useEffect(() => {
    const token = getParam("access_token");
    const refreshToken = getParam("refresh_token");
    const expiresIn = getParam("expires_in");
    if (token && refreshToken && expiresIn) {
      dispatch(authActions.login(token, refreshToken, expiresIn));
    }
  }, [dispatch]);

  return (
    <div className={styles.LandingPage}>
      {nextPage === "profile" && <Redirect to="/profile" />}
      {nextPage === "artists" && <Redirect to="/artists" />}
      {loading && <Spinner />}
      <div className={styles.titleAmatoMusic}>
        <span className={styles.AmatoMusic}>Amato Music</span>
        <div className={styles.titleComment}>
          ~ Connecting people <br />
          <span className={styles.withMusic}>with music ~</span>
        </div>
      </div>
      <div className={styles.explanation}>
        <li>The song plays in the artist's room</li>
        <li>Chat in the artist's room while listening to music</li>
        <li>Connect people who like the same artist</li>
      </div>
      <div className={styles.login}>
        <form className={styles.form}>
          <div className={styles.loginTitle}>Login</div>
          <a href={`${baseURL}/auth/login`} className={styles.loginButton}>
            Spotify Authorization
          </a>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
