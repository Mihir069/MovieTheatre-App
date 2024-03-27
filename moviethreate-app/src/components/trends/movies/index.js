import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchApiData } from "../../../services";
import { setMovieTrendsCollection } from "../../../reducers/collectionsReducer";
import CollectionCard from "../../common/collections-card";

const MovieTrendsCollections = () =>{
    const moviesTrendsCollectionList = useSelector((state)=>state.Collections.movieTrendsCollection);
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchDiscoverMovieTrends = async() =>{
            try{
                const movieTrendsCollectionData = await fetchApiData(`trending/movie/week`);
                dispatch(setMovieTrendsCollection(movieTrendsCollectionData))
            }catch(error){
                console.error('Error fetching movie data:', error.message);
            }
        };
        fetchDiscoverMovieTrends();
    },[dispatch])
    return(
        <CollectionCard theatreCollection={moviesTrendsCollectionList}/>
    )
}
export default MovieTrendsCollections;