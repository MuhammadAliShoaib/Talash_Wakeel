import React from 'react';
import "./styles.css";

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="inner">
                <div className="column is-logo">
                    <a href="#" className="main-logo">
                        <div className="logo">
                            <img src="/logo.png" alt="stackfindover" />
                        </div>
                        <div className="logo-info">
                            <div className="text">Stackfindover</div>
                            <span className="copyright">© 2021. All rights reserved.</span>
                        </div>
                    </a>
                </div>
                <div className="column is-nav">
                    <div className="column-title">Navigation</div>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Login</a></li>
                        <li><a href="#">Join</a></li>
                    </ul>
                </div>

                <div className="column is-nav">
                    <div className="column-title">Contact</div>
                    <ul>
                        <li><a href="#"><i className="fa fa-envelope-open"></i> info@stackfindover.com</a></li>
                        <li><a href="#"><i className="fa fa-twitter"></i>@stackfindover</a></li>
                        <li><a href="#"><i className="fa fa-linkedin"></i>Linkedin</a></li>
                    </ul>
                    <div className="column-title">Other</div>
                    <ul>
                        <li><a href="#">Quiz</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};
