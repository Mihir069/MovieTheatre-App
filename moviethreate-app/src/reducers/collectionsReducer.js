import { createSlice } from "@reduxjs/toolkit";

const collectionSlice = createSlice({
    name:"Collections",
    initialState:{
        moviesCollection:[],
        tvCollection:[],
        airingTodayCollection:[],
        onTheAirCollection:[],
        popularTvSeriesCollection:[],
        topTvSeriesCollection:[]
    },
    reducers:{
        setMoviesCollection(state,action){
            state.moviesCollection = action.payload;
        },
        setTvCollection(state,action){
            state.tvCollection = action.payload;
        },
        setAiringTodayCollection(state,action){
            state.airingTodayCollection = action.payload;
        },
        setOnTheAirCollection(state,action){
            state.onTheAirCollection = action.payload;
        },
        setPopularTvSeriesCollection(state,action){
            state.popularTvSeriesCollection = action.payload;
        },
        setTopTvSeriesCollection(state,action){
            state.topTvSeriesCollection = action.payload;
        }
    }
})
export const {setMoviesCollection,setTvCollection,setAiringTodayCollection,setOnTheAirCollection,setPopularTvSeriesCollection,setTopTvSeriesCollection} = collectionSlice.actions;
export default collectionSlice.reducer;