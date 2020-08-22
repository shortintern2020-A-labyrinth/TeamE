import React from "react";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="LandingPage">
      <div className="titleAmatoMusic">
        <span className="AmatoMusic">Amato Music</span>
        <div className="titleComment">
          ~ Connecting people <br />
          <span className="withMusic">with music ~</span>
        </div>
      </div>
      <div className="explanation">
        <li>The song plays in the artist's room</li>
        <li>Chat in the artist's room while listening to music</li>
        <li>Connect people who like the same artist</li>
      </div>
      <div className="login">
        <form className="form">
          <div className="loginTitle">Login</div>
          <a href="#" className="loginButton">
            Spotify Authorization
          </a>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
