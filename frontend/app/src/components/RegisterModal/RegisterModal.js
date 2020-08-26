import React, { useState } from "react";
import styles from "./RegisterModal.module.css";
import ArtistCard from "../ProfilePage/ArtistCard/ArtistCard";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import * as userActions from "../../store/actions/user";

const RegisterModal = (props) => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const userID = useSelector((state) => state.user.userID);

  const [searchText, setSearchText] = useState("");
  const [artists, setArtists] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedArtist, setSelectedArtist] = useState(null);

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
      setSelectedIndex(-1);
      setSelectedArtist(null);
    } catch (err) {
      console.log(err);
    }
  };

  const onSelectHandler = (artist, index) => {
    setSelectedIndex(index);
    setSelectedArtist(artist);
  };

  const onSaveHandler = async () => {
    if (selectedArtist) {
      try {
        const response = await axios.post(
          `http://localhost:3000/user/${userID}/favorites`,
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
          <h1 className={styles.headerTitle}>Register your favorite artist</h1>
        </div>
        <div className={styles.content}>
          <h2 className={styles.searchTitle}>Search</h2>
          <div className={`ui icon input ${styles.searchBar}`}>
            <input
              type="text"
              placeholder="Search artists..."
              value={searchText}
              onChange={(input) => onChangeHandler(input.target.value)}
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

export default RegisterModal;
