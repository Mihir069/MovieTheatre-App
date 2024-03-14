import { createSlice } from "@reduxjs/toolkit";

const favoriteMoviesSlice = createSlice({
    name:'favoriteMovie',
    initialState:{
        favoriteMovies:[]
    },
    reducers:{
        setfavoriteMovies(state,action){
            state.favoriteMovies =  [
                action.payload,
                ...state.favoriteMovies  
            ];
        }
    }
})
export const {setfavoriteMovies} = favoriteMoviesSlice.actions;
export default favoriteMoviesSlice.reducer;