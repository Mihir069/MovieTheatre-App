import "./style.css";
const MovieCast = ({movieCast}) =>{
    return(
        <div className="movie-cast">
        <h3>Cast</h3>
        <ul>
            {movieCast.map((castMember, index) => (
                <>
                <div className="movie-cast-profile">
                    <img src={`https://image.tmdb.org/t/p/w500${castMember.profile}`} alt={castMember.name} />
                </div> 
                <div className="movie-cast-name m-3">
                    <h6>{castMember.name}</h6>
                </div>
                </>

            ))}
        </ul>
    </div>
    )
}
export default MovieCast;