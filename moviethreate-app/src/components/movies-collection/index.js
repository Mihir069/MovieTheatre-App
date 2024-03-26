import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { useEffect } from "react";
import { fetchApiData} from "../../services";
import { setMoviesCollection } from "../../reducers/discoverMoviesReducer";
const MoviesCollections = () =>{
    const moviesCollectionList = useSelector((state)=>state.moviesCollection.moviesCollection);
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchDiscoverMovies = async() =>{
            try{
                const movieCollectionData = await fetchApiData(`discover/movie`);
                dispatch(setMoviesCollection(movieCollectionData))
            }catch(error){
                console.error('Error fetching user data:', error.message);
            }
        };
        fetchDiscoverMovies();
    },[dispatch])
    return(
        <div className="movies-collection-container">
            <div className="movies-collection-header p-5">
                <div className="collection-text p-5">
                    <h1>
                        Discover the various Entertainment here.
                    </h1>
                </div>
            </div>
            <div className="movies-collection">
                {moviesCollectionList.title}
                {console.log(moviesCollectionList.title)}
                {moviesCollectionList.map((movie,index)=>(
                    <div key={index}>
                        {movie.title}
                    </div>
                ))}
            </div>
        </div>
    )
}
export default MoviesCollections;