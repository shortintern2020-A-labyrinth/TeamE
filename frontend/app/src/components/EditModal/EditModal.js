import React from "react";
import styles from "./EditModal.module.css";
import ArtistCard from "../ArtistListPage/ArtistCard/ArtistCard";

const EditModal = (props) => {
  const data = [
    { name: "嵐", image: "" },
    { name: "米津玄師", image: "" },
    { name: "米津玄師", image: "" },
    { name: "米津玄師", image: "" },
    { name: "米津玄師", image: "" },
  ];

  console.log(props.artist.name)

  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>Register your favorite artist</h1>
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
            <input type="text" placeholder="Search artists..." />
            <i className="search icon"></i>
          </div>
          <ul className="ui five column grid">
            {data.map((datum, index) => (
              <li className="column" key={index}>
                <ArtistCard name={datum.name} image={datum.image} />
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
