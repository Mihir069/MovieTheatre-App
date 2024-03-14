import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsFavourite } from "../../../reducers/postMovieReducer";
import { postFavMovie } from "../../../services";
import { useParams } from "react-router-dom";

const Favourite = () => {
  const isFavourite = useSelector((state) => state.postMovie.isFavourite);
  const {movieId} = useParams();
  const dispatch = useDispatch();

  const toggleFavourite = async () => {
    try {
      dispatch(setIsFavourite(!isFavourite));
      console.log("added to fav :", !isFavourite);

      if (!isFavourite) {
        await postFavMovie(`account/20960400/favorite`, movieId);
      }
    } catch (error) {
      console.error("Error toggling favorite status:", error.message);
    }
  };

  useEffect(() => {
    const postMovieDetails = async () => {
      if (isFavourite) {
        try {
          await postFavMovie(`account/20960400/favorite`, movieId);
          console.log("Movie details posted successfully");
        } catch (error) {
          console.error("Error posting movie details:", error.message);
        }
      }
    };

    postMovieDetails(); 
  }, [isFavourite, movieId]);

  return (
    <div className="btn-container justify-content-between align-items-centre ">
      <div className="btn p-2" onClick={toggleFavourite}>
        <img src="../svg/star-solid.svg" alt="favourite" />
      </div>
    </div>
  );
};

export default Favourite;
