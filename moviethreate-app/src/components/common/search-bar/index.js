import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";

const SearchBar = () => {
    const [search, setSearch] = useState('');
    const [movieSearched, setMovieSearches] = useState([]);


    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        if (search.trim() !== '') {
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=27e7bd3c69a085aeeb14e90dccf23dfe&query=${search}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .then(data => {
                setMovieSearches(data.results);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
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
