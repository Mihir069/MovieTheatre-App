import { createContext, useEffect, useState } from "react";
import { fetchApiData,fetchGenreApi } from "../../services";
import { useDispatch,useSelector } from "react-redux";
import { setMovies,setPlayingMovies,setPopulerMovies,setMovieGenre,setTopRates,setTrendingMovies } from "../../reducers/movieReducer";
const MovieContext = createContext();

const MovieProvider = ({ children }) => {
    // const [movies, setMovies] = useState([]);
    // const [playingMovies, setPlayingMovies] = useState([]);
    // const [movieGenre, setMovieGenre] = useState([]);
    // const [populerMovie, setPopulerMovie] = useState([]);
    // const [topRates, setTopRates] = useState([]);
    // const [trendingMovies, setTrendingMovies] = useState([]);
    const [fetchedData, setFetchedData] = useState(false);
    const dispatch = useDispatch();
    const movies = useSelector((state)=>state.movies);
    const playingMovies = useSelector((state)=>state.playingMovies);
    const popularMovies = useSelector((state)=>state.popularMovies);
    const movieGenre = useSelector((state)=>state.movieGenre);
    const topRatedMovies = useSelector((state)=>state.topRatedMovies);
    const trendingMovies = useSelector((state)=>state.trendingMovies)


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

    useEffect(  () => {
        const fetchData = async () => {
            try {
                
               if (!fetchedData) {
                    const [trendingData, upcomingData, nowPlayingData, popularData, topRatedData, genreData] = await Promise.all([
                        fetchMovies("trending/all/day"),
                       fetchMovies("movie/upcoming"),
                       fetchMovies("movie/now_playing"),
                        fetchMovies("movie/popular"),
                       fetchMovies("movie/top_rated"),
                       fetchGenre("genre/movie/list")
                    ]);
                    dispatch(setMovies(upcomingData));
                    dispatch(setTrendingMovies(trendingData));
                    dispatch(setPlayingMovies(nowPlayingData));
                    dispatch(setPopulerMovies(popularData));
                    dispatch(setTopRates(topRatedData));
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
        <MovieContext.Provider value={{ movies, movieGenre, playingMovies, popularMovies, topRatedMovies, trendingMovies}}>
            {children}
        </MovieContext.Provider>
    );
};

export { MovieContext, MovieProvider };
