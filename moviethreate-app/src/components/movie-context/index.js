import { createContext, useEffect, useState } from "react";
import { fetchApiData,fetchGenreApi } from "../../services";
import { useDispatch,useSelector } from "react-redux";
import { setMovies,setMovieGenre,} from "../../reducers/movieReducer";
const MovieContext = createContext();

const MovieProvider = ({ children }) => {

    const [fetchedData, setFetchedData] = useState(false);
    const dispatch = useDispatch();
    const movies = useSelector((state)=>state.movie.movies);
    //const playingMovies = useSelector((state)=>state.movie.playingMovies);
    //const popularMovies = useSelector((state)=>state.movie.popularMovies);
    const movieGenre = useSelector((state)=>state.movie.movieGenre);
    //const topRatedMovies = useSelector((state)=>state.movie.topRatedMovies);
    //const trendingMovies = useSelector((state)=>state.movie.trendingMovies)


   const fetchMovies =  async (endpoint) => {
        const data =  await fetchApiData(endpoint);
        if (data) {
            return data;
        }
        return [];
    };

    const fetchGenre = async (endpoint) => {
        const data = await fetchGenreApi(endpoint);
        if (data.genres) {
            return data.genres.map((item) => ({
                id: item.id,
                genre_name: item.name,
            }));
        }
        return [];
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                
               if (!fetchedData) {
                    const [upcomingData,genreData] = await Promise.all([
                        //fetchMovies("trending/all/day"),
                       fetchMovies("movie/upcoming"),
                    //    fetchMovies("movie/now_playing"),
                        //fetchMovies("movie/popular"),
                       //fetchMovies("movie/top_rated"),
                       fetchGenre("genre/movie/list")
                    ]);
                    dispatch(setMovies(upcomingData));
                    //dispatch(setTrendingMovies(trendingData));
                    // dispatch(setPlayingMovies(nowPlayingData));
                    //dispatch(setPopulerMovies(popularData));
                    //dispatch(setTopRates(topRatedData));
                    dispatch(setMovieGenre(genreData));
                    // setTrendingMovies(trendingData);
                    // setMovies(upcomingData);
                    // setPlayingMovies(nowPlayingData);
                    // setPopulerMovies(popularData);
                    // setTopRates(topRatedData);
                    // setMovieGenre(genreData);
                    setFetchedData(true);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [fetchedData,dispatch]);
    return (
        <MovieContext.Provider value={{ movies, movieGenre}}>
            {children}
        </MovieContext.Provider>
    );
};

export { MovieContext, MovieProvider };
