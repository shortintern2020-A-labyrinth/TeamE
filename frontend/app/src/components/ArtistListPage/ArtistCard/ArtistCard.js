import React, { useState } from 'react';
import styles from './ArtistCard.module.css';
import singer_default_img from './singer_default.png';
import { useDispatch } from 'react-redux';
import * as artistActions from '../../../store/actions/artist';
import { Redirect } from 'react-router';


const ArtistCard = (props) => {
  const [enterRoom, setEnterRoom] = useState(false);

  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(artistActions.setArtist(props.artistid,props.name))
    setEnterRoom(true);
  };

  if (enterRoom) {
    return <Redirect to="/chats" />
  }

  return (
    <div className={styles.card}>
      <div
        onClick={() => onClickHandler()}
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
      </div>
    </div>
  );
};

export default ArtistCard;
