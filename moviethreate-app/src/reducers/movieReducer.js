import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name:"movies",
    initialState : {
        movies:[],
        playingMovies:[],
        movieGenre:[],
        popularMovies:[],
        topRatedMovies:[],
        trendingMovies:[],
    },
    reducers:{
        setMovies(state,action){
            state.movies = action.payload;
        },
        setPlayingMovies(state,action){
            state.playingMovies = action.payload;
        },
        setMovieGenre(state,action){
            state.movieGenre = action.payload; 
        },
        setPopulerMovies(state,action){
            state.popularMovies = action.payload;
        },
        setTopRates(state,action){
            state.topRatedMovies = action.payload;
        },
        setTrendingMovies(state,action){
            state.trendingMovies = action.payload;
        }
    }
})

export const {setMovies,setPlayingMovies,setMovieGenre,setPopulerMovies,setTopRates,setTrendingMovies} = movieSlice.actions;
export default movieSlice.reducer;