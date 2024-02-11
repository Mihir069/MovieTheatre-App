import MovieHeader from "./components/header";
import Home from "./page/home";
import Footer from "./components/footer";
import "./index.css"
import { BrowserRouter, Route,Routes } from "react-router-dom";
const App = () =>{
    return(
            <BrowserRouter>
                <MovieHeader/>
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                    </Routes>
                </div>
                <Footer/>
            </BrowserRouter>
    )
}
export default App;