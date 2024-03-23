import { createSlice } from "@reduxjs/toolkit";

const watchListMoviesSlice = createSlice({
    name: 'movieWatchList',
    initialState:{
        watchList:[]
    },
    reducers:{
        setWatchList(state,action){
            state.watchList = action.payload
        }
    }
})
export const {setWatchList} = watchListMoviesSlice.actions;
export default watchListMoviesSlice.reducer;