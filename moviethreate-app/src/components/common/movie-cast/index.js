import "./style.css";
const MovieCast = ({movieCast = []}) =>{


    return(
        <div className="movie-cast">
            <div className=" cast d-inline-flex">
                {movieCast.map((castMember, index) => (
                    <>
                    <div className="movie-cast-profile m-4 p-4">
                        <div className="movie-cast-img">
                            <img src={`https://image.tmdb.org/t/p/w500${castMember.profile}`} alt={castMember.name} />
                        </div>
                        <div className="movie-cast-name my-3">
                            <h4>{castMember.name}</h4>
                        </div>
                        <div className="movie-cast-name my-3">
                            <h6>{castMember.character}</h6>
                        </div>
                    </div> 

                    </>

                ))}
            </div>
    </div>
    )
}
export default MovieCast;