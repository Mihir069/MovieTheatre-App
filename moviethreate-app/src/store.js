import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./reducers/movieReducer";
import movieInfoReducer from "./reducers/movieInfoReducer";
export default configureStore({
    reducer:{
        movie:movieReducer,
        movieInfo:movieInfoReducer
    }
})