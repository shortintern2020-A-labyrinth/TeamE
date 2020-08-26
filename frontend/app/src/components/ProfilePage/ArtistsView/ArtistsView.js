import React from "react";
import styles from "./ArtistsView.module.css";
import ArtistListItem from "./ArtistListItem/ArtistListItem";

const ArtistsView = (props) => {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>My favorite</h2>
          <i
            className={"fas fa-plus-circle fa-2x " + styles.addBtn}
            onClick={props.onAdd}
          ></i>
        </div>
        <hr />
        {props.favorites.map((artist, index) => (
          <ArtistListItem
            artist={artist}
            key={index}
            onEdit={() => props.onEdit(artist)}
            onDelete={props.onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ArtistsView;
