import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./reducers/movieReducer";
export default configureStore({
    reducer:movieReducer,
})