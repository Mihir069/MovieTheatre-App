import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchApiData } from "../../../services";
import { setTopTvSeriesCollection } from "../../../reducers/collectionsReducer";
import TvCollectionCard from "../../common/collections-card/tv-series";

const TopTvSeries = () =>{
    const tvTopTvSeriesList = useSelector((state)=>state.Collections.topTvSeriesCollection);
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchTopTvSeries = async()=>{
            try{
                const topRatedSeriesData = await fetchApiData(`tv/top_rated`);
                dispatch(setTopTvSeriesCollection(topRatedSeriesData));
            }catch(error){
                console.error('Error fetching  data:', error.message);
            }
        };
        fetchTopTvSeries();
    },[dispatch])
    return(
        <TvCollectionCard theatreCollection={tvTopTvSeriesList}/>
    )
}
export default TopTvSeries;