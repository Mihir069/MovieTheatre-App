import { MovieProvider } from "./components/movie-context";
import { Provider } from "react-redux";
import { BrowserRouter, Route,Routes } from "react-router-dom";
import MovieHeader from "./components/header";
import Home from "./page/home";
import MovieInfo from "./components/movie-info";
import Footer from "./components/footer";
import store from "./store";
import "./index.css";

const App = () =>{
    return(
        <Provider store={store}>
            <MovieProvider>
                <BrowserRouter>
                    <div className="container mt-5 pt-5">
                        <MovieHeader/>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/movie/:movieId" element={<MovieInfo />} />
                        </Routes>
                    </div>
                    <Footer/>
                </BrowserRouter>
            </MovieProvider>
        </Provider>
    )
}
export default App;