import React from 'react';
import "./style.css";
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <footer className="footer-container py-5">
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <h5>About Us</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut est vel velit posuere bibendum.</p>
                    </div>
                    <div className="col-4">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/" className="footer-link">Home</Link></li>
                            <li><Link to="/" className="footer-link">About</Link></li>
                            <li><Link to="/" className="footer-link">Services</Link></li>
                            <li><Link to="/" className="footer-link">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="col-4">
                        <h5>Contact Us</h5>
                        <address>
                            <strong>Company Name</strong><br />
                            123 Street Name, City<br />
                            Country<br />
                            <abbr title="Phone">P:</abbr> (123) 456-7890
                        </address>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
