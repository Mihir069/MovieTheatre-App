import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchApiData } from "../../../services";
import { setPopularTvSeriesCollection } from "../../../reducers/collectionsReducer";
import CollectionCard from "../../common/collections-card";

const PopularTvSeries = () =>{
    const tvPopularTvSeriesList = useSelector((state)=>state.Collections.popularTvSeriesCollection);
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchPopularTvSeries = async()=>{
            try{
                const onTheAirData = await fetchApiData(`tv/popular`);
                dispatch(setPopularTvSeriesCollection(onTheAirData));
            }catch(error){
                console.error('Error fetching  data:', error.message);
            }
        };
        fetchPopularTvSeries();
    },[dispatch])
    return(
        <CollectionCard theatreCollection={tvPopularTvSeriesList}/>
    )
}
export default PopularTvSeries;