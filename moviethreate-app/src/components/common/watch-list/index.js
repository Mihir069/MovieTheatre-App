import { useState } from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import { deletewatchMovie, postwatchMovie } from "../../../services";
const WatchList = () =>{
    const [isInWatchList,setInWatchList] = useState(false);
    const {movieId} = useParams();

    const toggleWatchList = async() =>{
        try{
            if(isInWatchList){
                await deletewatchMovie(`account/20960400/watchlist`,movieId);
                setInWatchList(false);
            }else{
                await postwatchMovie(`account/20960400/watchlist`,movieId);
                setInWatchList(true);
            }
        }catch(error){
            console.error("Error toggling watchList status:", error.message);
        }
    }
    return(
        <div className="btn-container justify-content-between align-items-centre ">
            <div className="btn p-2 " onClick={toggleWatchList}>
                {
                    isInWatchList?(
                        <img src="../svg/bookmark-solid-saved.svg" alt="bookmark" />
                    ):(
                        <img src="../svg/bookmark-solid.svg" alt="bookmark" />
                    )
                }
                
            </div>
        </div>
    )
}
export default WatchList;