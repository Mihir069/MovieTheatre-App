import { Link } from "react-router-dom";
import ProgressBar from "../progress-bar";
import "./style.css";
const MovieCard = ({ movie }) => {

    return (
      <div className="movie ">
        <div className="movie-poster">
          <Link to={`/movie/${movie.id}`}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster}`} alt={movie.name} />
          </Link>
        </div> 
        <div className="movie-ratings">
          <ProgressBar stars={movie.ratings}/>
        </div>
        <div className="movie-name mb-4">
          <h6>{movie.title||movie.name}</h6>
        </div>
      </div>
    );
  }
  
  export default MovieCard;