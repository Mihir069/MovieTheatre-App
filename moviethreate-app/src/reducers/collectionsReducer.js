import { createSlice } from "@reduxjs/toolkit";

const collectionSlice = createSlice({
    name:"Collections",
    initialState:{
        moviesCollection:[],
        tvCollection:[]
    },
    reducers:{
        setMoviesCollection(state,action){
            state.moviesCollection = action.payload;
        },
        setTvCollection(state,action){
            state.tvCollection = action.payload;
        }
    }
})
export const {setMoviesCollection,setTvCollection} = collectionSlice.actions;
export default collectionSlice.reducer;