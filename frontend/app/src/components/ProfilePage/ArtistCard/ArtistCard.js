// Yuji Alves - ArtistCard Component

import React from "react";
import styles from "./ArtistCard.module.css";
import singer_default_img from "./singer_default.png";

const ArtistCard = (props) => {
  return (
    <div className={`${styles.card} ${props.clickable && styles.hover}`}>
      <div className="ui card">
        <div className="image">
          <img src={props.image ? props.image : singer_default_img} />
        </div>
      </div>
      <div className="artistname">
        <h3>{props.name}</h3>
      </div>
    </div>
  );
};

export default ArtistCard;
