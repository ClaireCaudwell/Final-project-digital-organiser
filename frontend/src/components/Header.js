import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import { ColourSchemeToggle } from "./ColourSchemeToggle";

import { user} from "../reducer/user";
import { weeklySchedule } from "../reducer/weeklySchedule";

export const Header = () => {
    const dispatch = useDispatch();

    const username = useSelector((store) => store.user.login.username);

    const handleLogOut = () => {
        dispatch(user.actions.setLogOut());
        dispatch(user.actions.setStatusMessage({ statusMessage: "Logged out!" }));
        dispatch(user.actions.setErrorMessage({ errorMessage: null }));
        dispatch(weeklySchedule.actions.setLogout());        
    };

    return (        
        <header>
            <div className="top-container">
                <div className="toggle-container">
                    <ColourSchemeToggle />
                    <p className="toggle-text">Toggle to choose between colour themes</p>
                </div>
                <NavLink to="/" className="logout-button">
                    <button type="button" onClick={handleLogOut}>LOG OUT</button>
                </NavLink>
            </div>
            <h2>Hi {username}. Welcome to your organiser</h2>
            <nav>
                <ul>
                    <div>
                        <li><NavLink to="/schedule" className="link" activeClassName="active">SCHEDULE</NavLink></li>
                    </div>
                    <div>
                        <li><NavLink to="/notes" className="link" activeClassName="active">NOTES</NavLink></li>
                    </div>
                </ul>
            </nav>
        </header>    
    );
};