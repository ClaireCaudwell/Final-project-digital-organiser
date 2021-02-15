import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

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
        <ToggleContainer>
            <ToggleInput
                type="checkbox"
                id="checkbox"
                checked={colourSchemeState === "checked" ? true : false}
                onChange={changeColourScheme}
            />
            <Slider htmlFor="checkbox" />
        </ToggleContainer>
    );
};

const ToggleContainer = styled.div`
    margin-top: 5px;
    position: relative;
`;

const Slider = styled.label`
    position: absolute;
    top: 0;
    left: 0;
    width: 66px;
    height: 32px;
    border-radius: 15px;
    background: #a5ed84;
    transition: 0.5s;
    cursor: pointer;
    padding-left: 2px;
    &::after {
    content: "";
        display: block;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        margin: 5px;
        background: #fff;
        transition: 0.5s;
    }
`;

const ToggleInput = styled.input`
    opacity: 0;
    z-index: 1;
    border-radius: 15px;
    width: 66px;
    height: 32px;
    transition: 0.5s;
    margin: 4px;
    //if the input is checked make the input and label 
    // change colour and apply the after psuedo styling
    &:checked + ${Slider} {
        background: #f5ccb1;
        &::after {
            display: block;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            margin-left: 38px;
            transition: 0.5s;
        }
    }
`;