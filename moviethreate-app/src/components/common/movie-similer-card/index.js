import { Link } from "react-router-dom";
import ProgressBar from "../progress-bar";
import "./style.css";
const MovieSimilerCard= ({similerMovies }) => {
    return (
      <div className="d-inline-flex">
        {
            similerMovies.map((similerMovies)=>(
                <>
                <div className="similar-movie-poster mx-2">
                    <Link to={`/movie/${similerMovies.id}`}>
                        <img src={`https://image.tmdb.org/t/p/w500${similerMovies.poster}`} alt={similerMovies.name} />
                    </Link>
                    <div className="movie-ratings">
                        <ProgressBar stars={similerMovies.ratings}/>
                    </div>
                    <div className="movie-name m-3">
                        <h6>{similerMovies.title}</h6>
                    </div>
                </div> 

                </>

            ))
        }

      </div>
    );
  }
  
  export default MovieSimilerCard;