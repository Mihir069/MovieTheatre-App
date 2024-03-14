import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./reducers/movieReducer";
import movieInfoReducer from "./reducers/movieInfoReducer";
import userAccountReducer from "./reducers/userAccountReducer";
import favoriteMovieReducer from "./reducers/favoriteMovieReducer";
import postMovieReducer from "./reducers/postMovieReducer";
export default configureStore({
    reducer:{
        movies:movieReducer,
        movieInfo:movieInfoReducer,
        userAccount:userAccountReducer,
        favoriteMovie:favoriteMovieReducer,
        postMovie:postMovieReducer
    }
})