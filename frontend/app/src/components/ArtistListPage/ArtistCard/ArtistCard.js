import React from 'react';
import './ArtistCard.css';
import singer_default_img from './singer_default.png';


const ArtistCard = (props) => {

  return (
    <div>
      <div className="ui fluid card">
        <div className="image">
          <img src={props.image ? props.image : singer_default_img} />
        </div>
        <div className="content">
          <p className="header">{props.name}'s Room</p>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
