import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import { ColourSchemeToggle } from "./ColourSchemeToggle";

import { user} from "../reducer/user";

export const Header = () => {
    const dispatch = useDispatch();

    const username = useSelector((store) => store.user.login.username);

    const handleLogOut = (event) => {
        event.preventDefault();
        dispatch(user.actions.setLogOut());
        dispatch(user.actions.setStatusMessage({ statusMessage: "Logged out!" }));
    };

    return (        
        <header>
            <div className="top-container">
                <div className="toggle-container">
                    <ColourSchemeToggle />
                    <p className="toggle-text">Toggle to choose between colour themes</p>
                </div>
                <button type="submit" onClick={handleLogOut}>LOG OUT</button>
            </div>
            <h2>Hi {username}. Welcome to your organiser</h2>
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