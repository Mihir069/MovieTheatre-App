import { useState } from "react";
import Logo from "../common/logo";
import SearchBar from "../common/search-bar";
import BookMark from "../common/book-marks";
import User from "../common/user";
import Menu from "../common/menu";
import "./style.scss";
import { Link } from "react-router-dom";

const MovieHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <div className="navbar container mt-4">
                <div className="row align-items-center py-2 my-2">
                    <div className="col-3 cursor">
                        <Link to="/">
                            <Logo />
                        </Link>
                    </div>
                    <div className="col-6 search-bar">
                        <SearchBar />
                    </div>
                    <div className="col-3">
                        <div className="mx-5 inline-end d-flex accounts">
                            <div className="book-mark">
                                <BookMark />
                            </div>
                            <div className="user">
                                <User />
                            </div>
                            <div className="menu" onClick={toggleMenu}>
                                <Menu />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`menu-slide ${menuOpen ? "open" : ""}`}>
                <div className="menu-header">
                    <span onClick={toggleMenu} className="menu-close-icon">
                        X
                    </span>
                </div>
                <ul className="slider-menu ">
                    <li className="menu-links">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="menu-links">
                        <Link to="/">About Us</Link>
                    </li>
                    <li className="menu-links">
                        <Link to="/">Genre</Link>
                    </li>
                    <li className="menu-links">
                        <Link to="/">Watchlist</Link>
                    </li>
                    <li className="menu-links">
                        <Link to="/">Blog</Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default MovieHeader;
