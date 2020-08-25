import React from 'react';
import styles from './SearchList.module.css';
import ArtistCard from '../ArtistCard/ArtistCard';
import searchArtist from './SearchArtist';



const SearchList = (props) => {

      // 検索結果データ
      const search_data = [
        { name: "嵐" ,
          image: ""
        },
        { name: "Twenty Twenty",
          image: ""
        },
      ];

    // const search_data = searchArtist(props.word);

    return (
        <div>
            <div className={styles.roomlist}>
            <ul className="ui five column grid">
            {search_data.map((search_artist, idx) => (
                <li className="column" key={idx}>
                <ArtistCard
                    name={search_artist.name}
                    image={search_artist.image}
                />
                </li>
            ))}
            </ul>
            </div>
        </div>
    );
};

export default SearchList;
