import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import {  getSearchResult } from '../../../services';
import { searchAPI } from '../../../config';

const SearchBar = () => {
    const [search, setSearch] = useState('');
    const [movieSearched, setMovieSearches] = useState([]);


    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        if (search.trim() !== '') {
            const searchResult = getSearchResult(searchAPI, search);
            if(searchResult){
                setMovieSearches(searchResult);
            }
        } else {
            setMovieSearches([]);
        }
    }, [search]);
    const handleMovieClick = () =>{
        setSearch('')
    }
    return (
        <>
            <div className="search-bar d-flex">
                <input type="text" className="custom-input" placeholder="Search movies..." onChange={handleChange} />
                <span className="input-group-text p-2">
                    <img src="./svg/magnifying-glass-solid.svg" alt="search-icon" className="img-fluid" />
                </span>
            </div>
            <div className={`search-results ${search || movieSearched.length>0 ? 'open' : ''}`}>
                {movieSearched.map((movie) => (
                    <div key={movie.id} className="row">
                        <Link to={`/movie/${movie.id}`} onClick={handleMovieClick}>
                            <div className="d-inline-flex  mx-1 px-1">
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="col-auto"/>
                                <h6 className="col-auto title my-5 mx-4">{movie.title}</h6>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SearchBar;
