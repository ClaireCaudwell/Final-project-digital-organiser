import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { user } from "../../reducer/user";

export const ColourSchemeToggle = () => {
    const dispatch = useDispatch();

    const colourSchemeState = useSelector((store) => store.user.toggleColourscheme);

    const changeColourScheme = () => {
        if(colourSchemeState) {
            dispatch(user.actions.setColourScheme({ colourScheme: false} ));
        }

        if(!colourSchemeState) {
            dispatch(user.actions.setColourScheme({ colourScheme: true }));
        }
    }

    return (
        <div className="toggle-container">
            <label className="switch" onChange={changeColourScheme}>
                <input 
                    type="checkbox"
                />
                <span className="slider round"></span>
            </label>
        </div>
    );
};