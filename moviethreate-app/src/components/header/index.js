import { useState } from "react";
import Logo from "../common/logo";
import SearchBar from "../common/search-bar";
import "./style.css";
import { Link } from "react-router-dom";
const MovieHeader = () => {
    const [menuOpen,setMenuOpen] = useState(false)

    const toggleMenu = () =>{
        setMenuOpen(!menuOpen)
    }
    return (
        <div className="container">
            <nav className="navbar">
                <div className="row align-items-center px-sm-3 py-sm-3">
                    <div className="col-12 col-lg-3 cursor">
                        <Link to="/">
                            <Logo/>
                        </Link>
                    </div>
                    <div className="col-12 col-lg-6 ">
                        <SearchBar/>
                    </div>
                    <div className="col-12 col-lg-3 ">
                        <div className="mx-5 inline-end d-lg-flex">
                            <div className="book-mark">
                                <img src="./svg/book-bookmark-solid.svg" alt="bookmark" height="20px" className="cursor mx-2" />
                            </div>
                            <div className="user">
                                <img src="./svg/user-solid.svg" alt="user" height="20px" className=" cursor mx-2" />
                            </div>
                            <div className="menu" onClick={toggleMenu}>
                                <img src="./svg/bars-solid.svg" alt="menu-bar" height="20px" className=" cursor mx-2" />
                            </div>
                            
                        </div>

                    </div>
                </div>
            </nav>
            {
                menuOpen && (<div className={`menu-slide ${menuOpen?`open`:''}`}>
                    <div className="menu-header">
                        <span onClick={toggleMenu} className="menu-close-icon">X</span>
                    </div>
                    <ul>
                        <li><Link to="/">Abour</Link></li>
                    </ul>
                </div>
            )}
        </div>
    )
}
export default MovieHeader;