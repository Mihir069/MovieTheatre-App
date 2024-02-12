import { createContext,useContext,useEffect,useState } from "react";
const MovieContext = createContext();

const MovieProvider = ({children})=>{
    const [movies,setMovies] = useState([]);
    const [playingMovies,setPlayingMovies] = useState([]);
    const [movieGenre,setMovieGenre] = useState([]);
    const [populerMovie,setPopulerMovie] = useState([]);
    const [topRates,setTopRates] = useState([]);
    const [trendingMovies,setTrendingMovies] = useState([]);

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=27e7bd3c69a085aeeb14e90dccf23dfe`,{
            method:'GET',
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.results){
                const trendingmovieList = data.results.map(items=>({
                    name: items.original_title,
                    poster:items.backdrop_path,
                    release_date:items.release_date,
                    ratings:items.vote_average,
                    genre: items.genre_ids
                }));
                setTrendingMovies(trendingmovieList);
            }else{
                console.log("no movie")
                setTrendingMovies([])
            }
        })
    },[]);

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=27e7bd3c69a085aeeb14e90dccf23dfe`,{
            method:'GET',
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.results){
                const movieList = data.results.map(items=>({
                    name: items.original_title,
                    poster:items.backdrop_path,
                    release_date:items.release_date,
                    ratings:items.vote_average,
                    genre: items.genre_ids
                }));
                setMovies(movieList);
            }else{
                console.log("no movie")
                setMovies([])
            }
        })
    },[]);

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=27e7bd3c69a085aeeb14e90dccf23dfe`,{
            method:'GET'
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.results){
                const playingMovie = data.results.map(items=>({
                    name: items.original_title,
                    poster:items.backdrop_path,
                    release_date:items.release_date,
                    ratings:items.vote_average,
                    genre: items.genre_ids
                }));
                setPlayingMovies(playingMovie)
            }else{
                setPlayingMovies([])
            }
        })
    },[])

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=27e7bd3c69a085aeeb14e90dccf23dfe`,{
            method:'GET'
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.results){
                const populer = data.results.map(items=>({
                    name: items.original_title,
                    poster:items.backdrop_path,
                    release_date:items.release_date,
                    ratings:items.vote_average,
                    genre: items.genre_ids
                }));
                setPopulerMovie(populer)
            }else{
                setPopulerMovie([])
            }
        })
    },[])

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=27e7bd3c69a085aeeb14e90dccf23dfe`,{
            method:'GET'
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.results){
                const topMovies = data.results.map(items=>({
                    name: items.original_title,
                    poster:items.backdrop_path,
                    release_date:items.release_date,
                    ratings:items.vote_average,
                    genre: items.genre_ids
                }));
                setTopRates(topMovies)
            }else{
                setTopRates([])
            }
        })
    },[])

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=27e7bd3c69a085aeeb14e90dccf23dfe`,{
            methos:'GET'
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.genres){
                const movieGenre = data.genres.map(items=>({
                    id:items.id,
                    genre_name:items.name
                }));
                setMovieGenre(movieGenre);
            }else{
                console.log("Genre is not availabe")
            }

        })
    },[])
    return(
        <MovieContext.Provider value={{movies,movieGenre,playingMovies,populerMovie,topRates,trendingMovies}}>
            {children}
        </MovieContext.Provider>
    )

};
const useMovie = () =>{
    const context = useContext(MovieContext);
    if(!context){
        throw new Error('error!!')
    }
    return context;
}
export {useMovie,MovieProvider}