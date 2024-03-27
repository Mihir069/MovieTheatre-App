import { useState } from "react";
import MoviesCollections from "../../components/movies-collection";
import TvSeiresCollections from "../../components/tv-collection";
import "./style.css";
const Collections = () =>{
    const [selectedOption,setSelectedOption] = useState('Movies');

    const handleOptionClick = (option) =>{
        setSelectedOption(option)
    }
    return(
        <div className="movie-collection-container">
            <div className="movies-collection-header p-5">
                <h1>
                    Discover the various Entertainment here.
                </h1>
            </div>
            <div className="movies-collection my-3 py-3">
                <div className="collection-list m-3 d-inline-flex col-6">
                    <div className={selectedOption === 'Movie'?'current':''} onClick={()=>handleOptionClick('Movies')} >
                        <h5 className={`px-3 ${selectedOption === 'Movies' ? 'current' : ''}`}>Movies</h5>
                    </div>
                    <div className={selectedOption === 'TV'?'current':''} onClick={()=>handleOptionClick('TV')}>
                        <h5 className={`px-3 ${selectedOption ==='TV'?'current':'' }`}>TV series</h5>
                    </div> 
                </div>
                {selectedOption === 'Movies' &&
                    <div className="fade-in">
                        <MoviesCollections />
                    </div>
                }
                {selectedOption === 'TV' &&
                    <div className="fade-in">
                        <TvSeiresCollections/>
                    </div>
                }
            </div>
        
        </div>
    )
}
export default Collections;