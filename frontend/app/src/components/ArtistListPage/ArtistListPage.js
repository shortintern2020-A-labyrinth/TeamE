import React, { useState } from 'react';
import './ArtistListPage.css';
import ArtistCard from './ArtistCard/ArtistCard';

const ArtistListPage = () => {
  // ユーザにお勧めするアーティストリスト
  var pickup_list = [];
  // 検索結果を管理するリスト
  var search_list = [];
  // ユーザにお勧めするアーティストデータ
  var pickup_data = [
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
  var search_data = [
    { name: "嵐" ,
      image: ""
    },
    { name: "Twenty Twenty",
      image: ""
    },
  ];

  // お勧めデータを配列に格納
  for(var i in pickup_data){
    pickup_list.push(
      <li className="column">
        <ArtistCard
            name={pickup_data[i].name}
            image={pickup_data[i].image}
        />
      </li>
    );
  }

  // 検索結果データを配列に格納
  for(var i in search_data){
    search_list.push(
      <li className="column">
        <ArtistCard
            name={search_data[i].name}
            image={search_data[i].image}
        />
      </li>
    );
  }

  return (
    <div>
      <h1 className="title">Pick up</h1>
      <div className="room-list">
        <ul className="ui five column grid">
          {pickup_list}
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
          {search_list}
        </ul>
      </div>
    </div>
  );
};

export default ArtistListPage;
