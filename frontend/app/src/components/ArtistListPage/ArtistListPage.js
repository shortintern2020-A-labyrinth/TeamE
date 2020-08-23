import React, { useState } from 'react';
import './ArtistListPage.css';
import ArtistCard from './ArtistCard/ArtistCard';

const ArtistListPage = () => {
  // ユーザにお勧めするアーティストデータ
  const pickup_data = [
    { name: "嵐",
      image: ""
    },
    { name: "ヨルシカ",
      image: ""
    },
    { name: "米津玄師",
      image: ""
    },
    { name: "YOASOBI",
      image: ""
    },
    { name: "The Chainsmokers",
      image: ""
    },
    { name: "Taylor Swift",
      image: ""
    },
    { name: "あいみょん",
      image: ""
    },
    { name: "Martin Garix",
      image: ""
    },
    { name: "Kygo",
      image: ""
    },
    { name: "Gryffin",
      image: ""
    },

  ];
  // 検索結果データ
  const search_data = [
    { name: "嵐" ,
      image: ""
    },
    { name: "Twenty Twenty",
      image: ""
    },
  ];

  return (
    <div>
      <h1 className="title">Pick up</h1>
      <div className="room-list">
        <ul className="ui five column grid">
          {pickup_data.map((pickup_artist, idx) => (
            <li className="column" key={idx}>
              <ArtistCard
                  name={pickup_artist.name}
                  image={pickup_artist.image}
              />
            </li>
          ))}
        </ul>
      </div>

      <h1 className="title">Search</h1>
      <div className="search-bar">
        <div class="ui huge icon input">
          <input type="text" placeholder="Search artists..." />
          <i class="search icon"></i>
        </div>
      </div>

      <div className="room-list">
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

export default ArtistListPage;
