import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { ColourSchemeToggle } from "./ColourSchemeToggle";

import { user} from "../../reducer/user";
import { weeklySchedule } from "../../reducer/weeklySchedule";
import { note } from "../../reducer/note";

import "./Header.css";
 
export const Header = () => {
    const dispatch = useDispatch();

    const username = useSelector((store) => store.user.login.username);

    const handleLogOut = () => {
        dispatch(user.actions.setLogOut());
        dispatch(user.actions.setStatusMessage({ statusMessage: "Logged out!" }));
        dispatch(user.actions.setErrorMessage({ errorMessage: null }));
        dispatch(weeklySchedule.actions.setLogout()); 
        dispatch(note.actions.setLogOut());  
    };

    return (        
        <header>
            <div className="top-container">
                <div className="header-toggle-container">
                    <ColourSchemeToggle />
                    <p>Toggle to choose between colour themes</p>
                </div>
                <NavLink to="/" activeClassName="non-active" className="logout-link">
                    <button type="button" className="logout-button" onClick={handleLogOut}>LOG OUT</button>
                </NavLink>
            </div>
            <div className="welcome-div">
                <h2>Hi <span>{username}</span></h2>
                <h2>Welcome to your organiser</h2>
            </div>
            <nav>
                <ul>
                    <NavLink to="/schedule" className="link hover-tab" activeClassName="active">
                        Schedule
                    </NavLink>
                    <NavLink to="/notespage" className="link hover-tab" activeClassName="active">
                        Notes
                    </NavLink>
                </ul>
            </nav>
        </header>    
    );
};