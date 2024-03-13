import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./reducers/movieReducer";
import movieInfoReducer from "./reducers/movieInfoReducer";
import userAccountReducer from "./reducers/userAccountReducer";
import favoriteMovieReducer from "./reducers/favoriteMovieReducer";
export default configureStore({
    reducer:{
        movie:movieReducer,
        movieInfo:movieInfoReducer,
        userAccount:userAccountReducer,
        favoriteMovie:favoriteMovieReducer
    }
})