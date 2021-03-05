import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { user} from "../reducer/user";
import { weeklySchedule } from "../reducer/weeklySchedule";
import { note } from "../reducer/note";
import { Bold } from "../styled-components/GlobalStyle";
import { 
    HeaderContainer, 
    TopContainer,
    ToggleContainer,
    Slider,
    ToggleInput,
    ToggleText,
    StyledLink,
    Link,
    SmallButton,
    WelcomeContainer,
    WelcomeText,
    UlContainer,
    NavContainer
 } from "../styled-components/Header";
 
export const Header = () => {
    const dispatch = useDispatch();;
    
    const colourSchemeState = useSelector((store) => store.user.toggleColourscheme);

    const changeColourScheme = () => {
        if(colourSchemeState === "unchecked"){
            dispatch(user.actions.setColourScheme({ colourScheme: "checked" }));
        } else {
            dispatch(user.actions.setColourScheme({ colourScheme: "unchecked" }));
        }
    };

    const username = useSelector((store) => store.user.login.username);

    const handleLogOut = () => {
        dispatch(user.actions.setLogOut());
        dispatch(weeklySchedule.actions.setLogout()); 
        dispatch(note.actions.setLogOut());  
        dispatch(user.actions.setStatusMessage({ statusMessage: "Logged out!" }));
        dispatch(user.actions.setErrorMessage({ errorMessage: null }));
        dispatch(user.actions.setLoading(false));
    };

    return (        
        <HeaderContainer>
            <TopContainer>
                <ToggleContainer>
                    <ToggleInput
                    type="checkbox"
                    id="checkbox"
                    checked={colourSchemeState === "checked" ? true : false}
                    onChange={changeColourScheme}
                    />
                    <Slider htmlFor="checkbox" />
                    <ToggleText>Toggle to choose between colour themes</ToggleText>
                </ToggleContainer>
                <StyledLink to="/">
                    <SmallButton 
                        type="button" 
                        onClick={handleLogOut}>
                            LOG OUT
                    </SmallButton>
                </StyledLink>
            </TopContainer>
            <WelcomeContainer>
                <WelcomeText>Hi <Bold>{username}</Bold></WelcomeText>
                <WelcomeText>Welcome to your organiser</WelcomeText>
            </WelcomeContainer>
            <NavContainer>
                <UlContainer>
                    <Link to="/schedule">Schedule</Link>
                    <Link to="/notespage">Notes</Link>
                </UlContainer>
            </NavContainer>
        </HeaderContainer>    
    );
};