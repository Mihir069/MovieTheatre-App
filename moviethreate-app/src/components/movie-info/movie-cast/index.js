import { useEffect } from 'react';
import { fetchDetailApi } from '../../../services';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setMovieCast } from '../../../reducers/movieInfoReducer';
import "./style.css";

const MovieCast = () => {
    const movieCast = useSelector((state)=>state.movieInfo.movieCast);
    const {movieId} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCast = async () => {
            try {
                const creditsData = await fetchDetailApi(`movie/${movieId}/credits`);
                const cast = creditsData.cast.map(castMember => ({
                    profile: castMember.profile_path,
                    name: castMember.name,
                    gender: castMember.gender === 2 ? 'Male' : castMember.gender === 1 ? 'Female' : 'Other',
                    character: castMember.character
                }));
                dispatch(setMovieCast(cast || []));
            } catch (error) {
                console.log("Error fetching cast data:", error);
            }
        };
        
        fetchCast();
    }, [movieId,dispatch]);

    return (
        <div className="movie-cast">
            <div className="cast d-inline-flex">
                {movieCast.map((castMember, index) => (
                    <div key={index} className="movie-cast-profile m-2 p-2">
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
                ))}
            </div>
        </div>
    );
};

export default MovieCast;
