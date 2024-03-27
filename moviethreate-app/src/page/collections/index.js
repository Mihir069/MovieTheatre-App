import { useState } from "react";
import MoviesCollections from "../../components/movies-collection";
import TvSeiresCollections from "../../components/tv-collection";
import AiringToday from "../../components/tv-list/airing-today";
import OnTheAir from "../../components/tv-list/on-the-air";
import PopularTvSeries from "../../components/tv-list/popular";
import TopTvSeries from "../../components/tv-list/top-rated";
import MovieTrendsCollections from "../../components/trends/movies";
import TvTrendsCollections from "../../components/trends/tv-series";
import "./style.css";

const Collections = () =>{
    const [selectedOption,setSelectedOption] = useState('Movies');
    const [selectedTvOption,setSeletedTvOption] = useState('Airing-today');

    const handleOptionClick = (option) =>{
        setSelectedOption(option)
    }

    const handleSelectedTvOption = (option) =>{
        setSeletedTvOption(option)
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
                    <h5 className="px-3">Discover |</h5>
                    <div className={selectedOption === 'TV'?'current':''} onClick={()=>handleOptionClick('TV')}>
                        <h5 className={`px-3 ${selectedOption ==='TV'?'current':'' }`}>TV series</h5>
                    </div> 
                    <div className={selectedOption === 'Movies'?'current':''} onClick={()=>handleOptionClick('Movies')} >
                        <h5 className={`px-3 ${selectedOption === 'Movies' ? 'current' : ''}`}>Movies</h5>
                    </div>
                </div>
                {selectedOption === 'TV' &&
                    <div className="fade-in">
                        <TvSeiresCollections/>
                    </div>
                }
                {selectedOption === 'Movies' &&
                    <div className="fade-in">
                        <MoviesCollections />
                    </div>
                }
            </div>
            <div className="movies-collection my-3 py-3">
                <div className="collection-list m-3 d-inline-flex col-6">
                    <h5 className="px-3">Tv Series |</h5>
                    <div className={selectedTvOption === 'Airing-today'?'current':''} onClick={()=>handleSelectedTvOption ('Airing-today')} >
                        <h5 className={`px-3 ${selectedTvOption === 'Airing-today' ? 'current' : ''}`}>Airing Today</h5>
                    </div>
                    <div className={selectedTvOption === 'On-the-air'?'current':''} onClick={()=>handleSelectedTvOption ('On-the-air')}>
                        <h5 className={`px-3 ${selectedTvOption ==='On-the-air'?'current':'' }`}>On the air</h5>
                    </div> 
                    <div className={selectedTvOption === 'Popular'?'current':''} onClick={()=>handleSelectedTvOption ('Popular')}>
                        <h5 className={`px-3 ${selectedTvOption ==='Popular'?'current':'' }`}>Popular</h5>
                    </div> 
                    <div className={selectedTvOption === 'Top-rated'?'current':''} onClick={()=>handleSelectedTvOption ('Top-rated')}>
                        <h5 className={`px-3 ${selectedTvOption ==='Top-rated'?'current':'' }`}>Top rated</h5>
                    </div> 
                </div>
                {selectedTvOption === 'Airing-today' &&
                    <div className="fade-in">
                        <AiringToday/>
                    </div>
                }
                {selectedTvOption === 'On-the-air' &&
                    <div className="fade-in">
                        <OnTheAir/>
                    </div>
                }
                {selectedTvOption === 'Popular' &&
                    <div className="fade-in">
                        <PopularTvSeries/>
                    </div>
                }
                {selectedTvOption === 'Top-rated' &&
                    <div className="fade-in">
                        <TopTvSeries/>
                    </div>
                }
            </div>
            <div className="movies-collection my-3 py-3">
                <div className="collection-list m-3 d-inline-flex col-6">
                    <h5 className="px-3">Trendings |</h5>
                    <div className={selectedOption === 'TV'?'current':''} onClick={()=>handleOptionClick('TV')}>
                        <h5 className={`px-3 ${selectedOption ==='TV'?'current':'' }`}>TV series</h5>
                    </div> 
                    <div className={selectedOption=== 'Movies'?'current':''} onClick={()=>handleOptionClick('Movies')} >
                        <h5 className={`px-3 ${selectedOption === 'Movies' ? 'current' : ''}`}>Movies</h5>
                    </div>
                </div>
                {selectedOption === 'TV' &&
                    <div className="fade-in">
                        <TvTrendsCollections/>
                    </div>
                }
                {selectedOption === 'Movies' &&
                    <div className="fade-in">
                        <MovieTrendsCollections/>
                    </div>
                }
            </div>
        </div>
    )
}
export default Collections;