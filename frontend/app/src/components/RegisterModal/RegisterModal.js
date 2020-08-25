import React, { useState } from "react";
import styles from "./RegisterModal.module.css";
import ArtistCard from "../ArtistListPage/ArtistCard/ArtistCard";
import axios from "axios";

const RegisterModal = (props) => {
  const [searchText, setSearchText] = useState("");
  const [artists, setArtists] = useState([]);

  const token = ""

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
    } catch (err) {
      console.log(err);
    }
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
              <li className="column" key={index}>
                <ArtistCard
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
            <p className={styles.btn} onClick={props.onBlur}>
              Save
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
