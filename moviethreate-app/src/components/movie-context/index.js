import { createContext, useEffect, useState } from "react";

import { fetchApiData,fetchGenreApi } from "../../services";
const MovieContext = createContext();

const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [playingMovies, setPlayingMovies] = useState([]);
    const [movieGenre, setMovieGenre] = useState([]);
    const [populerMovie, setPopulerMovie] = useState([]);
    const [topRates, setTopRates] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [fetchedData, setFetchedData] = useState(false);

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
                    setTrendingMovies(trendingData);
                    setMovies(upcomingData);
                    setPlayingMovies(nowPlayingData);
                    setPopulerMovie(popularData);
                    setTopRates(topRatedData);
                    setMovieGenre(genreData);
                    setFetchedData(true);
               }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [fetchedData]);
    return (
        <MovieContext.Provider value={{ movies, movieGenre, playingMovies, populerMovie, topRates, trendingMovies}}>
            {children}
        </MovieContext.Provider>
    );
};

export { MovieContext, MovieProvider };
