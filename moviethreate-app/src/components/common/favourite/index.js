import { useState,useEffect } from "react";
import { fetchFavMovieApi, postFavMovie } from "../../../services";
import { useParams } from "react-router-dom";

const Favourite = () => {
  const [isFavourite,setIsFavourite] = useState(false);
  const {movieId} = useParams();

  useEffect(()=>{
    const checkFavorite = async () =>{
      try{
        const response = await fetchFavMovieApi(`account/20960400/favorite/movies`,movieId);
        if(response){
          setIsFavourite(true)
        }
      }catch(error){
        console.error("Error in checking favorite :",error);
      }
    };
    checkFavorite();
  },[movieId])
  const toggleFavourite = async () => {
    try {

      if (isFavourite) {
        await postFavMovie(`account/20960400/favorite`, movieId);
        setIsFavourite(true)
      }
    } catch (error) {
      console.error("Error toggling favorite status:", error.message);
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
