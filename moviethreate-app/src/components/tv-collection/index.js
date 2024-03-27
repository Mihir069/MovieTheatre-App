import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchApiData} from "../../services";
import { setTvCollection } from "../../reducers/collectionsReducer";
import CollectionCard from "../common/collections-card";
const TvSeiresCollections = () =>{
    const tvCollectionList = useSelector((state)=>state.Collections.tvCollection);
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchDiscoverTv = async() =>{
            try{
                const tvCollectionData = await fetchApiData(`discover/tv`);
                dispatch(setTvCollection(tvCollectionData))
            }catch(error){
                console.error('Error fetching tv data:', error.message);
            }
        };
        fetchDiscoverTv();
    },[dispatch])
    return(
        <CollectionCard theatreCollection={tvCollectionList}/>
    )
}
export default TvSeiresCollections;