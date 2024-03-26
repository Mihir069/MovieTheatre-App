import { createSlice } from "@reduxjs/toolkit";

const discoverMovieSlice = createSlice({
    name:"moviesCollection",
    initialState:{
        moviesCollection:[]
    },
    reducers:{
        setMoviesCollection(state,action){
            state.moviesCollection = action.payload;
        }
    }
})
export const {setMoviesCollection} = discoverMovieSlice.actions;
export default discoverMovieSlice.reducer;