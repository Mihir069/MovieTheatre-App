import { useState } from "react";
import { useMovie } from "../movie-context";
const MovieCard = () =>{
    const {movies} = useMovie();
    console.log("Movies",movies)
    if(!movies){
        return(
            <div>Loading.....</div>
        )
    }
    return(
        <div className="movie-card">
            {
                movies.map((movie,index)=>(
                    <li key={index}>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster}`} alt={movie.name} />
                        <p>{movie.name}</p>
                    </li>
                ))
            }
        </div>
    )
}
export default MovieCard;