import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { user } from "../../reducer/user";

export const ColourSchemeToggle = () => {
    const dispatch = useDispatch();
    
    const colourSchemeState = useSelector((store) => store.user.toggleColourscheme);

    const changeColourScheme = () => {
        if(colourSchemeState === "unchecked"){
            dispatch(user.actions.setColourScheme({ colourScheme: "checked" }));
        } else {
            dispatch(user.actions.setColourScheme({ colourScheme: "unchecked" }));
        }
    };

    return (
        <div className="toggle-container">
            <label className="switch">
                <input
                    className="input"
                    type="checkbox"
                    checked={colourSchemeState === "checked" ? true : false}
                    onChange={changeColourScheme}
                />
                <span
                    // className="slider round"
                    className={colourSchemeState === "checked" ? "input:checked slider round" : "slider round"}
                >
                </span>
            </label>
        </div>
    );
};