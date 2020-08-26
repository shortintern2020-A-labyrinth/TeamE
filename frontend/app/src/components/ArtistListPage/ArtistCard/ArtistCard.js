import React from 'react';
import styles from './ArtistCard.module.css';
import singer_default_img from './singer_default.png';
import { Link } from "react-router-dom";



const ArtistCard = (props) => {

  return (
    <div className={styles.card}>
      <Link
        to={{
          pathname: "/chats",
          artist_name: props.name,
          artist_id: props.artistid
        }}
        className="button"
      >
        <div className="ui card">
          <div className="image">
            <img src={props.image ? props.image : singer_default_img} /> 
          </div>
        </div>
        <div className="artistname">
          <h3>{props.name}</h3>
        </div>
      </Link>
    </div>
  );
};

export default ArtistCard;
