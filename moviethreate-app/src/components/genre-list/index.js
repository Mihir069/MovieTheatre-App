import { useMovie } from "../movie-context";
import "./style.css"
const GenreList= () =>{
    const {movieGenre} = useMovie();
    console.log("Movies",movieGenre)
    if(!movieGenre){
        return(
            <div>Loading.....</div>
        )
    }
    return(
        <section className="my-5">
            <div className="genre-heading">
                Genre
            </div>
            <div className="movie-card-container">
                <div className="movie-card d-inline-flex">
                    {
                        movieGenre.map((movie,index)=>(
                            
                            <div key={index} className="genre-1">{movie.genre_name}</div>
                            
                            
                        ))
                    }
                </div>
    
            </div>
        </section>

    )
}
export default GenreList;