import MovieHeader from "./components/header";
import { BrowserRouter } from "react-router-dom";
const App = () =>{
    return(
        <div className="container">
            <BrowserRouter>
                <MovieHeader/>
            </BrowserRouter>
        </div>
    )
}
export default App;