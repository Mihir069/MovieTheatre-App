import { createContext, useEffect, useState } from "react";

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [playingMovies, setPlayingMovies] = useState([]);
    const [movieGenre, setMovieGenre] = useState([]);
    const [populerMovie, setPopulerMovie] = useState([]);
    const [topRates, setTopRates] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [fetchedData, setFetchedData] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
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
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (!fetchedData) {
            fetchData();
        }
    }, [fetchedData]);

    const fetchMovies = async (endpoint) => {
        const response = await fetch(`https://api.themoviedb.org/3/${endpoint}?api_key=27e7bd3c69a085aeeb14e90dccf23dfe`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.results) {
            return data.results.map((item) => ({
                id: item.id,
                title: item.original_title,
                name: item.original_name,
                poster: item.backdrop_path,
                release_date: item.release_date,
                ratings: item.vote_average,
                genre: item.genre_ids,
            }));
        }
        return [];
    };

    const fetchGenre = async (endpoint) => {
        const response = await fetch(`https://api.themoviedb.org/3/${endpoint}?api_key=27e7bd3c69a085aeeb14e90dccf23dfe`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.genres) {
            return data.genres.map((item) => ({
                id: item.id,
                genre_name: item.name,
            }));
        }
        return [];
    };

    return (
        <MovieContext.Provider value={{ movies, movieGenre, playingMovies, populerMovie, topRates, trendingMovies }}>
            {children}
        </MovieContext.Provider>
    );
};

export { MovieContext, MovieProvider };
