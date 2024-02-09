import MovieHeader from "./components/header";
import Movie from "./components/movie";
import "./index.css"
import { BrowserRouter, Route,Routes } from "react-router-dom";
const App = () =>{
    return(
        <div className="container">
            <BrowserRouter>
                <MovieHeader/>
                <Routes>
                    <Route path="/" element={<Movie/>}/>
                </Routes>
                
            </BrowserRouter>
        </div>
    )
}
export default App;