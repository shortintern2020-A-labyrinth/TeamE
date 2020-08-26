import React, { useState } from "react";
import styles from "./EditModal.module.css";
import ArtistCard from "../ProfilePage/ArtistCard/ArtistCard";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import * as userActions from "../../store/actions/user";

const EditModal = (props) => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const userID = useSelector((state) => state.user.userID);

  const [searchText, setSearchText] = useState("");
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(props.artist);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const onChangeHandler = async (text) => {
    setSearchText(text);
    try {
      const name = encodeURIComponent(text);
      const response = await axios.get(
        `http://localhost:3000/spotify/search-artist?name=${name}`,
        {
          headers: {
            access_token: token,
          },
        }
      );
      const artistsList = await response.data.artists.slice(0, 5);
      setArtists(artistsList);
      console.log(artists);
    } catch (err) {
      console.log(err);
    }
  };

  const onSelectHandler = (artist, index) => {
    setSelectedIndex(index);
    setSelectedArtist(artist);
  };

  const onSaveHandler = async () => {
    if (selectedArtist && selectedArtist !== props.artist) {
      try {
        const response = await axios.put(
          `http://localhost:3000/user/${userID}/favorites?aid=${props.artist.id}`,
          selectedArtist,
          {
            headers: {
              access_token: token,
            },
          }
        );
        if (response.status === 200) {
          const likedArtists = await response.data;
          console.log(likedArtists);
          dispatch(userActions.setLikedArtists(likedArtists));
        }
      } catch (err) {
        console.log(err);
      }
    }
    props.onBlur();
  };

  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>Edit your favorite artist</h1>
        </div>
        <div className={styles.content}>
          <h2 className={styles.artistName}>Artist Name</h2>
          <ul className="ui five column grid">
            <li className="column">
              <ArtistCard
                name={selectedArtist.name}
                image={selectedArtist.image && selectedArtist.image.url}
              />
            </li>
          </ul>
          <h2 className={styles.searchTitle}>Search</h2>
          <div className={`ui icon input ${styles.searchBar}`}>
            <input
              type="text"
              placeholder="Search artists..."
              value={searchText}
              onChange={(text) => onChangeHandler(text.target.value)}
            />
            <i className="search icon"></i>
          </div>
          <ul className="ui five column grid">
            {artists.map((artist, index) => (
              <li
                className={`column ${selectedIndex === index && styles.list}`}
                key={index}
                onClick={() => onSelectHandler(artist, index)}
              >
                <ArtistCard
                  clickable
                  name={artist.name}
                  image={artist.image && artist.image.url}
                />
              </li>
            ))}
          </ul>
          <div className={styles.btnController}>
            <p className={styles.btn} onClick={props.onBlur}>
              Cancel
            </p>
            <p className={styles.btn} onClick={onSaveHandler}>
              Save
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
