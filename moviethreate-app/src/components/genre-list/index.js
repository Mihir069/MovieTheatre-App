import {useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenreApi } from "../../services";
import { setMovieGenre } from "../../reducers/movieReducer";
import Loading from "../common/loader";
import "./style.css";

const GenreList= () =>{
    const [fetchedData,setFetchedData] = useState(false);
    const movieGenre = useSelector((state)=>state.movie.movieGenre);
    const dispatch = useDispatch();

    const fetchGenre = async(endpoint) =>{
        const data  = await fetchGenreApi(endpoint);
        if (data.genres) {
            return data.genres.map((item) => ({
                id: item.id,
                genre_name: item.name,
            }));
        }
        return [];
    }

    useEffect(()=>{
        const fetchData = async() =>{
            try{
                if(!fetchedData){
                    const genreData = await Promise(
                        fetchGenre("genre/movie/list")
                    );
                    dispatch(setMovieGenre(genreData));
                    setFetchedData(true);
                }
            }catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    },[fetchedData,dispatch]);

    if(!movieGenre){
        return(
            <div><Loading/></div>
        )
    }

    const genre = movieGenre.map((movie,index)=>(
        <div key={index} className="genre-1">{movie.genre_name}</div>
    ))
    return(
        <section className="my-5">
            <div className="genre-heading">
                Genre
            </div>
            <div className="movie-card-container">
                <div className="movie-card d-inline-flex">
                    {genre}
                </div>
    
            </div>
        </section>

    )
}
export default GenreList;