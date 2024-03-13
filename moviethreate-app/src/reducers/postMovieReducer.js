import { createSlice } from "@reduxjs/toolkit";

const postFavMovieSlice = createSlice({
    name:"postMovie",
    initialState:{
        isFavourite:false
    },
    reducers:{
        setIsFavourite(state,action){
            state.isFavourite = action.payload;
        }
    }
})
export const {setIsFavourite} = postFavMovieSlice.actions;
export default postFavMovieSlice.reducer;