import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { ColourSchemeToggle } from "./ColourSchemeToggle";

export const Header = () => {

    const username = useSelector((store) => store.user.login.username);

    return (        
        <header>
            <div className="header-toggle-container">
                <h2>Hi {username}. Welcome to your organiser</h2>
                <div className="toggle-container">
                    <ColourSchemeToggle />
                    <p className="toggle-text">Toggle to choose between colour themes</p>
                </div>
            </div>
            <nav>
                <ul>
                    <div>
                        <li><NavLink className="link" activeClassName="active" to="/schedule">SCHEDULE</NavLink></li>
                    </div>
                    <div>
                        <li><NavLink className="link" to="/notes">NOTES</NavLink></li>
                    </div>
                </ul>
            </nav>
        </header>    
    );
};