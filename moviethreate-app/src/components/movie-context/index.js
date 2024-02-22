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

    const [movieId, setMovieId] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState([]);
    const [movieImages, setMovieImages] = useState([]);
    const [movieCast, setMovieCast] = useState([]);
    const [review, setReview] = useState([]);
    const [video, setVideo] = useState([]);
    const [similerMovies, setSimilerMovies] = useState([]);

    useEffect(() => {
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

    useEffect(() => {
        if (movieId) {
            fetchMovieDetails();
        }
    }, [movieId]);

    const fetchMovieDetails = async () => {
        try {
            const [movieData, imagesData, creditsData, similarData, reviewsData, videosData] = await Promise.all([
                fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=27e7bd3c69a085aeeb14e90dccf23dfe`).then(res => res.json()),
                fetch(`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=27e7bd3c69a085aeeb14e90dccf23dfe`).then(res => res.json()),
                fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=27e7bd3c69a085aeeb14e90dccf23dfe`).then(res => res.json()),
                fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=27e7bd3c69a085aeeb14e90dccf23dfe`).then(res => res.json()),
                fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=27e7bd3c69a085aeeb14e90dccf23dfe`).then(res => res.json()),
                fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=27e7bd3c69a085aeeb14e90dccf23dfe`).then(res => res.json())
            ]);

            const movie = {
                id: movieData.id,
                title: movieData.title,
                poster: movieData.backdrop_path,
                release_date: movieData.release_date,
                ratings: movieData.vote_average,
                genres: movieData.genres ? movieData.genres.map(genre => genre.name).join(", ") : "",
                overview: movieData.overview,
                runtime: movieData.runtime,
                vote_count: movieData.vote_count
            };
            setSelectedMovie(movie);

            const movieImages = imagesData.backdrops && imagesData.backdrops.map(backdrop => ({
                file_path: backdrop.file_path,
                aspect_ratio: backdrop.aspect_ratio,
                height: backdrop.height,
                width: backdrop.width,
            }));
            setMovieImages(movieImages || []);

            const movieCast = creditsData.cast && creditsData.cast.map(castMember => ({
                profile: castMember.profile_path,
                name: castMember.name,
                gender: castMember.gender === 2 ? 'Male' : castMember.gender === 1 ? 'Female' : 'Other',
                character: castMember.character
            }));
            setMovieCast(movieCast || []);

            const similer = similarData.results && similarData.results.map(item => ({
                id: item.id,
                title: item.original_title,
                poster: item.backdrop_path,
            }));
            setSimilerMovies(similer || []);

            const reviews = reviewsData.results && reviewsData.results.map(review => ({
                id: review.id,
                author: review.author,
                content: review.content,
                rating: review.author_details.rating,
                created_at: review.created_at
            }));
            setReview(reviews || []);

            const trailer = videosData.results && videosData.results.find(clip => clip.type === "Trailer");
            if (trailer) setVideo(trailer.key);
        } catch (error) {
            console.error("Error fetching movie data:", error);
        }
    };

    const fetchMovies = async (endpoint) => {
        const response = await fetch(`https://api.themoviedb.org/3/${endpoint}?api_key=27e7bd3c69a085aeeb14e90dccf23dfe`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.results) {
            return data.results.map((item) => ({
                id: item.id,
                title: item.original_title || item.original_name,
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
        <MovieContext.Provider value={{ movies, movieGenre, playingMovies, populerMovie, topRates, trendingMovies, movieId, setMovieId, selectedMovie, movieImages, movieCast, review, video, similerMovies }}>
            {children}
        </MovieContext.Provider>
    );
};

export { MovieContext, MovieProvider };
