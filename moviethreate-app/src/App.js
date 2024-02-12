import MovieHeader from "./components/header";
import Home from "./page/home";
import MovieInfo from "./components/movie-info";
import { MovieProvider } from "./components/movie-context";
import Footer from "./components/footer";
import "./index.css"
import { BrowserRouter, Route,Routes } from "react-router-dom";
const App = () =>{
    return(
            <BrowserRouter>
                <MovieProvider>
                    <MovieHeader/>
                        <div className="container">
                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route path="/movie/:movieId" element={<MovieInfo />} />
                            </Routes>
                        </div>
                    <Footer/>
                </MovieProvider>

            </BrowserRouter>
    )
}
export default App;