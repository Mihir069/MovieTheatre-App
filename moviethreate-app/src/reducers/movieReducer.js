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
const movieInfoSlice = createSlice({
    name:"movieInfo",
    initialState:{
        selectedMovie:[],
        movieImages:[],
        movieCast:[],
        review:[],
        video:[],
        similerMovies:[]

    },
    reducers:{
        setSelectedMovie(state,action){
            state.selectedMovie = action.payload;
        },
        setMovieImages(state,action){
            state.movieImages = action.payload;
        },
        setMovieCast(state,action){
            state.movieCast = action.payload;
        },
        setReview(state,action){
            state.review = action.payload;
        },
        setVideo(state,action){
            state.video = action.payload;
        },
        setSimilerMovies(state,action){
            state.similerMovies = action.payload;
        }
    }
})
export const {setMovies,setPlayingMovies,setMovieGenre,setPopulerMovies,setTopRates,setTrendingMovies} = movieSlice.actions;
export const {setSelectedMovie,setMovieImages,setMovieCast,setReview,setVideo,setSimilerMovies} = movieInfoSlice.actions;
export default movieSlice.reducer;