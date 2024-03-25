import { useState} from "react";
import { postFavMovie, deleteFavMovie} from "../../../services";
import { useParams } from "react-router-dom";

const Favourite = () => {
  const [isFavourite, setIsFavourite] = useState(false);
  const { movieId } = useParams();

  const addToFavorites = async() =>{
    try{
      await postFavMovie(`account/20960400/favorite`,movieId);
      setIsFavourite(true);
    }catch(error){
      console.error("Error in adding to favorite :",error.message);
    }
  };

  const removeFromFavorites = async() =>{
    try{
      await deleteFavMovie(`account/20960400/favorite`,movieId);
      setIsFavourite(false);
    }catch(error){
      console.error("Error in removing to favorite :",error.message);
    }
  };

  const handleClick = async() =>{
    if(isFavourite){
      await removeFromFavorites();
    }
    else{
      await addToFavorites();
    }
  }

  return (
    <div className="btn-container justify-content-between align-items-centre">
      <div className="btn p-2" onClick={handleClick}>
        {isFavourite ? (
          <img src="../svg/star-solid.svg" alt="favourite" />
        ) : (
          <img src="../svg/star-regular.svg" alt="favourite" />
        )}
      </div>
    </div>
  );
};

export default Favourite;
