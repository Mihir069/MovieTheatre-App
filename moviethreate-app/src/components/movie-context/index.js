import { createContext,useContext,useEffect,useState } from "react";
const MovieContext = createContext();

const MovieProvider = ({children})=>{
    const [movies,setMovies] = useState([]);
    const [movieGenre,setMovieGenre] = useState([])
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
            }
        })
    },[]);

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
        <MovieContext.Provider value={{movies,movieGenre}}>
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