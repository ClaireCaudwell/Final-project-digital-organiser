import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { user} from "../reducer/user";
import { 
    ToggleContainer,
    Slider,
    ToggleInput,
    ToggleText,
 } from "../styled-components/Header";

export const Toggle = ({ frontpageToggle }) => {

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
        <>
        <ToggleContainer className={frontpageToggle}>
            <ToggleInput
                type="checkbox"
                id="checkbox"
                checked={colourSchemeState === "checked"}
                onChange={changeColourScheme}
            />
            <Slider htmlFor="checkbox" />
            <ToggleText>Toggle to choose between colour themes</ToggleText>
        </ToggleContainer>
        </>
    );
};