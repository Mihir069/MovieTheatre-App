import { useState} from "react";
import {postFavMovie, deleteFavMovie } from "../../../services";
import { useParams } from "react-router-dom";

const Favourite = () => {
  const [isFavourite, setIsFavourite] = useState(false);
  const { movieId } = useParams();


  const toggleFavourite = async () => {
    try {
      if (isFavourite) {
        await deleteFavMovie(`account/20960400/favorite`, movieId);
        setIsFavourite(false);
      } else {
        await postFavMovie(`account/20960400/favorite`, movieId);
        setIsFavourite(true);
      }
    } catch (error) {
      console.error("Error toggling favorite status:", error.message);
    }
  };

  return (
    <div className="btn-container justify-content-between align-items-centre">
      <div className="btn p-2" onClick={toggleFavourite}>
        {isFavourite ? (
            <img src="../svg/star-solid.svg" alt="favourite" />
          ) : (
            <img src="../svg/star-regular.svg" alt="favourite" />
          )
        }
      </div>
    </div>
  );
};

export default Favourite;
