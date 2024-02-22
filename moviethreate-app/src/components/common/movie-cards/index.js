import { Link } from "react-router-dom";
import WatchList from "../watch-list/index";
import Reviews from "../review/review";
import "./style.css";
const MovieCard = ({ movie, movieGenre }) => {

  const getMovieGenere = () => {
    const genere =  movie.genre.map((genreId, index) => {
      const genre = movieGenre.find(genre => genre.id === genreId);
      return <div key={index} className="genre d-inline m-1">{genre && genre.genre_name}</div>;
    })
    return genere;
  }
    return (
      <div className="movie row-cols-auto">
        <div className="movie-poster">
          <Link to={`/movie/${movie.id}`}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster}`} alt={movie.name} />
          </Link>
        </div> 
        <div className="movie-name m-3">
          <h6>{movie.title||movie.name}</h6>
        </div>
        <div className="movie-rating my-2">
          <Reviews stars={movie.ratings}/>
        </div>
        <div className="movie-genre my-2 py-2">
          {getMovieGenere()}
        </div>
        <div className="watch-list">
          <WatchList prop="Watch list"/>
        </div>
      </div>
    );
  }
  
  export default MovieCard;