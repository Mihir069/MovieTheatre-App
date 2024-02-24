import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchApiData,fetchDetailApi } from "../../services";
const MovieContext = createContext();

const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [playingMovies, setPlayingMovies] = useState([]);
    const [movieGenre, setMovieGenre] = useState([]);
    const [populerMovie, setPopulerMovie] = useState([]);
    const [topRates, setTopRates] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [fetchedData, setFetchedData] = useState(false);

    const [selectedMovie,setSelectedMovie] = useState({});
    const [movieImages,setMovieImages] = useState([]);
    const [movieCast,setMovieCast] = useState([]);
    const [review,setReview] = useState([]);
    const [video,setVideo] = useState([]);
    const [similerMovies,setSimilerMovies] = useState([]);
    const {movieId} = useParams();
 

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

    useEffect(()=>{
        const fetchMovieDetails = async () =>{
            const [movieData,imagesData,creditsData,similarData,reviewData,videoData] = await Promise.all([
                fetchDetails(`movie/${movieId}`),   
                fetchDetails(`movie/${movieId}/images`),
                fetchDetails(`movie/${movieId}/credits`),
                fetchDetails(`movie/${movieId}/similar`),
                fetchDetails(`movie/${movieId}/reviews`),
                fetchDetails(`movie/${movieId}/videos`)
            ]);
            setSelectedMovie(movieData);
            setMovieImages(imagesData);
            setMovieCast(creditsData);
            setSimilerMovies(similarData);
            setReview(reviewData)
     
            // const trailer = videoData.results && videoData.results.find(clip=>clip.type==="Trailer");
            // if(trailer){
            //     setVideo(trailer.key)
            // }else{
            //     setVideo(null)
            // }
        }



        fetchMovieDetails();
    },[movieId])
    const fetchMovies = async (endpoint) => {
        // const response = await fetch(`https://api.themoviedb.org/3/${endpoint}?api_key=27e7bd3c69a085aeeb14e90dccf23dfe`);
        // if (!response.ok) {
        //     throw new Error("Network response was not ok");
        // }
        const data = await  fetchApiData(endpoint);
        console.log("await log",data.results)
        if (data.results) {
            return data.results;
        }
        return [];
    };

    const fetchGenre = async (endpoint) => {
        // const response = await fetch(`https://api.themoviedb.org/3/${endpoint}?api_key=27e7bd3c69a085aeeb14e90dccf23dfe`);
        // if (!response.ok) {
        //     throw new Error("Network response was not ok");
        // }
        const data = await fetchApiData(endpoint);
        if (data.genres) {
            return data.genres.map((item) => ({
                id: item.id,
                genre_name: item.name,
            }));
        }
        return [];
    };

    const fetchDetails = async (endpoint) => {
            const data = await fetchDetailApi(endpoint);
            return data;
    };

    return (
        <MovieContext.Provider value={{ movies, movieGenre, playingMovies, populerMovie, topRates, trendingMovies,selectedMovie,movieCast,movieImages,review,video,similerMovies}}>
            {children}
        </MovieContext.Provider>
    );
};

export { MovieContext, MovieProvider };
