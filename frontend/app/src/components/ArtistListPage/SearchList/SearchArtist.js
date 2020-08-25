// import { useState, useEffect } from "react";
// import axios from "axios";


// const SearchArtist = word => {
//     const [artistList, setArtistList] = useState([]);
//     const fetchArtist = async word => {
//         const response = await axios.get(
//             `http://localhost:3000/search-artist&query=${word}`
//         );
//         const data = responce.data.results;
//         setArtistList(data);
//     };

//     // 第二引数に変数を与えると、最初のレンダリング時と、
//     // 変数の値が変更された時のみメソッドが動く
//     useEffect(() => {
//         fetchArtist(word);
//         console.log(word);
//         console.log(artistList);
//     }, [word])

//     return artistList;
// };

// export default SearchArtist;