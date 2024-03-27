import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchApiData} from "../../services";
import { setMoviesCollection } from "../../reducers/collectionsReducer";
import MovieCollectionCard from "../common/collections-card/movies";
const MoviesCollections = () =>{
    const moviesCollectionList = useSelector((state)=>state.Collections.moviesCollection);
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchDiscoverMovies = async() =>{
            try{
                const movieCollectionData = await fetchApiData(`discover/movie`);
                dispatch(setMoviesCollection(movieCollectionData))
            }catch(error){
                console.error('Error fetching movie data:', error.message);
            }
        };
        fetchDiscoverMovies();
    },[dispatch])
    return(
        <MovieCollectionCard theatreCollection={moviesCollectionList}/>
    )
}
export default MoviesCollections;