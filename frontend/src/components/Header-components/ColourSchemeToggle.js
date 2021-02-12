import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { user } from "../../reducer/user";

export const ColourSchemeToggle = () => {
    const dispatch = useDispatch();

    const [ onToggle, setOnToggle ] = useState(false);
    
    const colourSchemeState = useSelector((store) => store.user.toggleColourscheme);

    const changeColourScheme = () => {
        if(!onToggle){
            setOnToggle(true);
            dispatch(user.actions.setColourScheme({ colourScheme: "checked" }));
        } else {
            setOnToggle(false);
            dispatch(user.actions.setColourScheme({ colourScheme: "unchecked" }));
        }
    };

    // useEffect(() => {
    //     if(colourSchemeState) {
    //         dispatch(user.actions.setColourScheme({ colourScheme: "checked" }));
    //     }
    // }, []);

    return (
        <div className="toggle-container">
            <label className="switch" onChange={changeColourScheme}>
                <input
                    className="input"
                    type="checkbox"
                    value={onToggle}
                    onChange={event => setOnToggle(event.target.value)}
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