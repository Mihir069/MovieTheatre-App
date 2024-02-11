import "./style.css"
import IncomignMovie from "./incoming-movies";
import NowPlaying from "./now-playing";
const MovieCard = () =>{

    return(
        <>
            <IncomignMovie/>
            <NowPlaying/>
        </>
    )
}
export default MovieCard;