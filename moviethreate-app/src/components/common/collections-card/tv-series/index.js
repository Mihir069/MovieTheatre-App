import { Link } from "react-router-dom"
import ProgressBar from "../../progress-bar"
import "../style.css";
const TvCollectionCard = ({theatreCollection}) =>{
    return(
        <div className="collectedItem-collection-list d-flex">
            {theatreCollection.map((collectedItem,index)=>(
                <div key={index} className="col-auto mb-4">
                    <div className="collectedItem-list p-3">
                        <div className="collectedItem-poster-list">
                            {/* to={`/movie/${collectedItem.id}`} */}
                            <Link to="/collections">
                                <img src={`https://image.tmdb.org/t/p/w500${collectedItem.poster}`} alt={collectedItem.name} />
                            </Link>
                        </div>
                        <div className="collectedItem-ratings">
                            <ProgressBar stars={collectedItem.ratings}/>
                        </div>
                        <div className="collectedItem-name mt-2">
                            {collectedItem.title }
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default TvCollectionCard;