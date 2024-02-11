import MovieHeader from "./components/header";

import Home from "./page/home";
import "./index.css"
import { BrowserRouter, Route,Routes } from "react-router-dom";
const App = () =>{
    return(
        <div className="container">
            <BrowserRouter>
                <MovieHeader/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                </Routes>
                
            </BrowserRouter>
        </div>
    )
}
export default App;