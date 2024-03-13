import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsFavourite } from "../../../reducers/postMovieReducer";
import { postFavMovie } from "../../../services";

const Favourite = ({ movieId }) => {
  const isFavourite = useSelector((state) => state.postMovie.isFavourite);
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
  }, [dispatch, isFavourite, movieId]);

  return (
    <div className="btn-container justify-content-between align-items-centre ">
      <div className="btn p-2" onClick={toggleFavourite}>
        <img src="../svg/star-solid.svg" alt="favourite" />
      </div>
    </div>
  );
};

export default Favourite;
