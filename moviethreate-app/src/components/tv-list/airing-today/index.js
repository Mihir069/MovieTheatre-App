import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchApiData } from "../../../services";
import { setAiringTodayCollection } from "../../../reducers/collectionsReducer";
import TvCollectionCard from "../../common/collections-card/tv-series";


const AiringToday = () =>{
    const tvAiringTodayList = useSelector((state)=>state.Collections.airingTodayCollection);
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchAiringToday = async()=>{
            try{
                const airingTodayData = await fetchApiData(`tv/airing_today`);
                dispatch(setAiringTodayCollection(airingTodayData));
            }catch(error){
                console.error('Error fetching  data:', error.message);
            }
        };
        fetchAiringToday();
    },[dispatch])
    return(
        <TvCollectionCard theatreCollection={tvAiringTodayList}/>
    )
}
export default AiringToday;