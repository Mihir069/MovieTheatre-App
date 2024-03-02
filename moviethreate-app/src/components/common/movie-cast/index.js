import "./style.css";
const MovieCast = ({movieCast}) =>{
    const casts = movieCast.map((castMember, index) => (
        <>
        <div className="movie-cast-profile m-2 p-2">
            <div className="movie-cast-img">
                <img src={`https://image.tmdb.org/t/p/w500${castMember.profile}`} alt={castMember.name} />
            </div>
            <div className="movie-cast-name my-3">
                <h6>{castMember.name}</h6>
            </div>
            <div className="movie-cast-name my-3">
                <h6>{castMember.character}</h6>
            </div>
        </div> 

        </>

    ))
    return(
        <div className="movie-cast">
            <div className=" cast d-inline-flex">
                {casts}
            </div>
    </div>
    )
}
export default MovieCast;