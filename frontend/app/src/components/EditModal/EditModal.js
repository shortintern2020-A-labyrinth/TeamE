import React, { useState } from "react";
import styles from "./EditModal.module.css";
import ArtistCard from "../ArtistListPage/ArtistCard/ArtistCard";
import axios from "axios";
import { useSelector } from "react-redux";

const EditModal = (props) => {
  const token = useSelector((state) => state.auth.token);

  const [searchText, setSearchText] = useState("");
  const [artists, setArtists] = useState([]);

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
              <ArtistCard name={props.artist.name} image={props.artist.image} />
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

export default EditModal;
