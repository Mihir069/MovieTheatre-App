import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchApiData } from "../../../services";
import { setOnTheAirCollection } from "../../../reducers/collectionsReducer";
import TvCollectionCard from "../../common/collections-card/tv-series";

const OnTheAir = () =>{
    const tvOnTheAirList = useSelector((state)=>state.Collections.onTheAirCollection);
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchOnTheAir = async()=>{
            try{
                const onTheAirData = await fetchApiData(`tv/on_the_air`);
                dispatch(setOnTheAirCollection(onTheAirData));
            }catch(error){
                console.error('Error fetching  data:', error.message);
            }
        };
        fetchOnTheAir();
    },[dispatch])
    return(
        <TvCollectionCard theatreCollection={tvOnTheAirList}/>
    )
}
export default OnTheAir;