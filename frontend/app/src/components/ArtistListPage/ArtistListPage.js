import React, { useState } from 'react';
import './ArtistListPage.css';

const ArtistListPage = () => {
  const [value, setValue] = useState("aaa");

  return (
    <div>
      <h1>ArtistListPage</h1>
      <p>{value}</p>
      <input type="button" onClick={() => setValue("bbb")} />
    </div>
  );
};

export default ArtistListPage;
