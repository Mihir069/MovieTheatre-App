import React, { useState } from "react";
import "./style.css";

const Favourite = ({ movieId }) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const toggleFavourite = () => {
    setIsFavourite(!isFavourite);
    console.log("added to fave",isFavourite)


    if (!isFavourite) {
      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyN2U3YmQzYzY5YTA4NWFlZWIxNGU5MGRjY2YyM2RmZSIsInN1YiI6IjY1YmI5YTdjZTE4Yjk3MDE3YjlhMWNhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.McH6PQ9z5EXcvzgOskjifiL3B5aqAC_5Vzu_tlciZaM",
        },
        body: JSON.stringify({ media_type: "movie", media_id: movieId, favorite: true }),
      };

      fetch("https://api.themoviedb.org/3/account/20960400/favorite?api_key=27e7bd3c69a085aeeb14e90dccf23dfe", options)
        .then((response) => {
          if (response.ok) {
            console.log("Movie marked as favourite successfully.");
          } else {
            console.error("Failed to mark movie as favourite.");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="btn-container justify-content-between align-items-centre ">
      <div className="btn p-2" onClick={toggleFavourite}>
        <img src="../svg/star-solid.svg" alt="favourite" />
      </div>
    </div>
  );
};

export default Favourite;
