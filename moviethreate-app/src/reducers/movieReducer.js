import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name:"movies",
    initialState : {
        upcomingMovies:[],
        playingMovies:[],
        movieGenre:[],
        popularMovies:[],
        topRatedMovies:[],
        trendingMovies:[],
    },
    reducers:{
        setUpcomingMovies(state,action){
            state.upcomingMovies = action.payload;
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

export const {setUpcomingMovies,setPlayingMovies,setMovieGenre,setPopulerMovies,setTopRates,setTrendingMovies} = movieSlice.actions;
export default movieSlice.reducer;