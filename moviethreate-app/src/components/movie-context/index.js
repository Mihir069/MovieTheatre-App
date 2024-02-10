import { createContext,useContext,useEffect,useState } from "react";
const MovieContext = createContext();

const MovieProvider = ({children})=>{
    const [movies,setMovies] = useState([]);

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
                    poster:items.backdrop_path
                }));
                setMovies(movieList);
            }else{
                console.log("no movie")
            }
        })
    },[]);

    return(
        <MovieContext.Provider value={{movies}}>
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