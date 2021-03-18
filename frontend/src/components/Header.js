import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { user} from "../reducer/user";
import { weeklySchedule } from "../reducer/weeklySchedule";
import { note } from "../reducer/note";
import { Toggle } from "./Toggle";

import { Bold } from "../styled-components/GlobalStyle";
import { 
    HeaderContainer, 
    TopContainer,
    StyledLink,
    Link,
    SmallButton,
    WelcomeContainer,
    WelcomeText,
    UlContainer,
    NavContainer
 } from "../styled-components/Header";
 
export const Header = () => {
    const dispatch = useDispatch();
    
    const username = useSelector((store) => store.user.login.username);

    const handleLogOut = () => {
        dispatch(user.actions.setLogOut());
        dispatch(weeklySchedule.actions.setLogout()); 
        dispatch(note.actions.setLogOut());  
        dispatch(user.actions.setStatusMessage({ statusMessage: "Logged out!" }));
        dispatch(user.actions.setErrorMessage({ errorMessage: null }));
    };

    return (        
        <HeaderContainer>
            <TopContainer>
                <Toggle />
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