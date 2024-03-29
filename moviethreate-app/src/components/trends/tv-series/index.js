import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchApiData } from "../../../services";
import { setTvTrendsCollection } from "../../../reducers/collectionsReducer";
import TvCollectionCard from "../../common/collections-card/tv-series";

const TvTrendsCollections = () =>{
    const tvTrendsCollectionList = useSelector((state)=>state.Collections.tvTrendsCollection);
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchDiscoverTvTrends = async() =>{
            try{
                const tvTrendsCollectionData = await fetchApiData(`trending/tv/week`);
                dispatch(setTvTrendsCollection(tvTrendsCollectionData))
            }catch(error){
                console.error('Error fetching movie data:', error.message);
            }
        };
        fetchDiscoverTvTrends();
    },[dispatch])
    return(
        <TvCollectionCard theatreCollection={tvTrendsCollectionList}/>
    )
}
export default TvTrendsCollections;