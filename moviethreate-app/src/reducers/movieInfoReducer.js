import { createSlice } from "@reduxjs/toolkit";

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

export const {setSelectedMovie,setMovieImages,setMovieCast,setReview,setVideo,setSimilerMovies} = movieInfoSlice.actions;
export default movieInfoSlice.reducer;