import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./reducers/movieReducer";
import movieInfoReducer from "./reducers/movieInfoReducer";
import userAccountReducer from "./reducers/userAccountReducer";
import favoriteMovieReducer from "./reducers/favoriteMovieReducer";
import movieWatchListReducer from "./reducers/movieWatchListReducer";
import collectionsReducer from "./reducers/collectionsReducer";
export default configureStore({
    reducer:{
        movies:movieReducer,
        movieInfo:movieInfoReducer,
        userAccount:userAccountReducer,
        favoriteMovie:favoriteMovieReducer,
        movieWatchList:movieWatchListReducer,
        Collections:collectionsReducer
    }
})