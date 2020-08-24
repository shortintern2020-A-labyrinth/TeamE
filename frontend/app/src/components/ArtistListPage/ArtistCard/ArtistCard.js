import React from 'react';
import styles from './ArtistCard.module.css';
import singer_default_img from './singer_default.png';
import arashi from './arashi.jpg';
// 一時的にsinger_default_imgからarashi


const ArtistCard = (props) => {

  return (
    <div className={styles.card}>
      <a href="#" className="button">
        <div className="ui card">
          <div className="image">
            <img src={props.image ? props.image : arashi} /> 
          </div>
        </div>
        <div className="artistname">
          <h3>{props.name}</h3>
        </div>
      </a>
    </div>
  );
};

export default ArtistCard;
