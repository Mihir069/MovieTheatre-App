import { Provider } from "react-redux";
import { BrowserRouter, Route,Routes } from "react-router-dom";
import MovieHeader from "./components/header";
import Home from "./page/home";
import MovieInfo from "./page/movie-details";
import AccountPage from "./page/accountpage";
import Collections from "./page/collections";
// import LoginPage from "./components/authentication";
import Footer from "./components/footer";
import store from "./store";
import "./index.css";

const App = () =>{
    return(
        <Provider store={store}>
                <BrowserRouter>
                    <div className="container mt-5 pt-5">
                        <MovieHeader/>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/movie/:movieId" element={<MovieInfo />} />
                            <Route path="/account" element={<AccountPage/>}/>
                            <Route path="/collections" element={<Collections/>}/>
                            {/* <Route path="/login" element={<LoginPage/>}/> */}
                        </Routes>
                    </div>
                    <Footer/>
                </BrowserRouter>
        </Provider>
    )
}
export default App;