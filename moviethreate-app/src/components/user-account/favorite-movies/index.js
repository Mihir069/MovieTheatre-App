import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchFavMovieApi } from "../../../services";
import { setfavoriteMovies } from "../../../reducers/favoriteMovieReducer";
import { Link } from "react-router-dom";
import ProgressBar from "../../common/progress-bar";
import "./style.css";

const FavoriteMovies = () =>{
    const favoriteMovies = useSelector((state)=>state.favoriteMovie.favoriteMovies);
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchFavoriteMovie = async() =>{
            try{
                const favoriteMovieData = await fetchFavMovieApi(`account/20960400/favorite/movies`);
                dispatch(setfavoriteMovies(favoriteMovieData));
            }catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };
        fetchFavoriteMovie();
    },[dispatch]);
    return(
        <div className="favorite-movies d-inline-flex pt-4">
          {
            favoriteMovies.map((favmovie, index) => (
              <div key={index}>
                <div className="movie py-2 ">
                  <div className="movie-poster">
                    <Link to={`/movie/${favmovie.id}`}>
                      <img src={`https://image.tmdb.org/t/p/w500${favmovie.backdrop_path}`} alt={favmovie.name} />
                    </Link>
                  </div> 
                  <div className="movie-ratings">
                    <ProgressBar stars={favmovie.vote_average}/>
                  </div>
                  <div className="movie-name mb-4">
                    <h6>{favmovie.title||favmovie.original_title}</h6>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
    )
};

export default FavoriteMovies;