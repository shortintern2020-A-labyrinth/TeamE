import { useState, useEffect } from "react";
import axios from "axios";


const SearchArtist = (word) => {
    const [artistList, setArtistList] = useState([]);
    console.log(word);
    console.log(artistList);

    // const word = encodeURIComponent(word);
    const fetchArtist = async word => {
        const responce = await axios.get('http://localhost:3000/spotify/search-artist', {
            qs: {
              name: word　//ゲットしたいもの
            },
            headers: {
 
              access_token: "BQBCCKz5aGxFzNHK7oZ3ZWJ26nM0Xzw6Matyq7NRQagmhODPY72KOfypO8JI07NA-oVE6SD17ptptftv3vtwk2K2zqRfLSEOm7l-x6lq7Xr2vQF7JnwI-dmRuLSbwo7vB60AO-Ao4ddYlvKPvVEZOh8f50UWSqUpiKPiG6LcjJ0VLpNYEm1YqLk9XhVkJBw"
            }
          });
            const data = responce.data.results;
            setArtistList(data);
        }
        
        
    //     (
    //         `http://localhost:3000/search-artist?name=${word}`
    //     );
    //     const data = responce.data.results;
    //     setArtistList(data);
    // };

    // 第二引数に変数を与えると、最初のレンダリング時と、
    // 変数の値が変更された時のみメソッドが動く
    useEffect(() => {
        fetchArtist(word);
    }, [word])

    return artistList;
};

export default SearchArtist;