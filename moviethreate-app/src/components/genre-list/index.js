import { useContext } from "react";
import { MovieContext } from "../movie-context";
import "./style.css"
const GenreList= () =>{
    const {movieGenre} = useContext(MovieContext);
    console.log("Movies",movieGenre)
    if(!movieGenre){
        return(
            <div>Loading.....</div>
        )
    }
    const genre = movieGenre.map((movie,index)=>(
        <div key={index} className="genre-1">{movie.genre_name}</div>
    ))
    return(
        <section className="my-5">
            <div className="genre-heading">
                Genre
            </div>
            <div className="movie-card-container">
                <div className="movie-card d-inline-flex">
                    {genre}
                </div>
    
            </div>
        </section>

    )
}
export default GenreList;