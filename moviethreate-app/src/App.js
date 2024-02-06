import MovieHeader from "./components/js/movieHeader";
import { BrowserRouter } from "react-router-dom";
const App = () =>{
    return(
        <div>
            <BrowserRouter>
                <MovieHeader/>
            </BrowserRouter>
        </div>
    )
}
export default App;