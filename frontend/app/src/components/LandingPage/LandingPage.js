import React, { useEffect, useState } from "react";
import styles from "./LandingPage.module.css";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/actions/auth";
import { getParam } from "../../utils/utils";
import Spinner from "./Spinner/Spinner";

const LandingPage = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = getParam("access_token");
    const refreshToken = getParam("refresh_token");
    const expiresIn = getParam("expires_in");
    if (token && refreshToken && expiresIn) {
      setLoading(true);
      dispatch(setToken(token, refreshToken, expiresIn));
    }
  });

  return (
    <div className={styles.LandingPage}>
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
          <a
            href="http://localhost:3000/auth/login"
            className={styles.loginButton}
          >
            Spotify Authorization
          </a>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
