import React, { useState, useEffect } from 'react';
import styles from './ArtistListPage.module.css';
import ArtistCard from './ArtistCard/ArtistCard';
import GlobalMenu from './GlobalMenu/GlobalMenu';
import axios from "axios";

const token = "";

const ArtistListPage = () => {

  const [searchText, setSearchText] = useState("");
  const [searchArtists, setSearchArtists] = useState([]);
  const [pickupArtists, setPickupArtists] = useState([]);
  const [pickup, setPickup] = useState([]);

  useEffect(() => {
    fetchPickup().then(pickup => setPickup(pickup));
  }, [])

  const fetchPickup = async () => {
    try {
      const pickup_response = await axios.get(
        `http://localhost:3000/spotify/top-artist`,
        {
          headers: {
            access_token: token,
          },
        }
      );
      const pickupArtistsList = await pickup_response.data.artists.slice(0, 10);
      setPickupArtists(pickupArtistsList);
    } catch (err) {
      console.log(err);
    }
    return pickupArtists;
  }; 

  const onChangeHandler = async (text) => {
    setSearchText(text);
    try {
      const name = encodeURIComponent(text);
      const search_response = await axios.get(
        `http://localhost:3000/spotify/search-artist?name=${name}`,
        {
          headers: {
            access_token: token,
          },
        }
      );
      const searchArtistsList = await search_response.data.artists.slice(0, 5);
      setSearchArtists(searchArtistsList);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <GlobalMenu />
      <h1 className={styles.title}>Pick up</h1>
      <div className={styles.roomlist}>
        <ul className="ui five column grid">
          {pickupArtists.map((pickup_artist, idx) => (
            <li className="column" key={idx}>
              <ArtistCard
                  name={pickup_artist.name}
                  image={pickup_artist.image && pickup_artist.image.url}
              />
            </li>
          ))}
        </ul>
      </div>

      <h1 className={styles.title}>Search</h1>
      <div className={styles.searchbar}>
        <div className="ui inverted huge icon input">
          <input
            type="text"
            placeholder="Search artists..."
            onChange={(input) => onChangeHandler(input.target.value)}
          />
          <i className="search icon"></i>
        </div>
      </div>
      
      <div className={styles.roomlist}>
        <ul className="ui five column grid">
        {searchArtists.map((search_artist, idx) => (
            <li className="column" key={idx}>
            <ArtistCard
                name={search_artist.name}
                image={search_artist.image && search_artist.image.url}
            />
            </li>
        ))}
        </ul>
      </div>

      
    </div>
  );
};

export default ArtistListPage;
