import React from "react";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={styles.LandingPage}>
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
          <a href="#" className={styles.loginButton}>
            Spotify Authorization
          </a>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
