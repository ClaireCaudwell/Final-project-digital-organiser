import React from "react";
import { useSelector } from "react-redux"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styled-components/GlobalStyle";
import LightTheme from "../styled-components/LightTheme";
import DarkTheme from "../styled-components/DarkTheme";

import { SignupLogin } from "./SignupLogin";
import { Schedule } from "./Schedule";
import { NotesPage } from "./NotesPage";
import { AddEditTask } from "components/Schedule-components/AddEditTask";
import { TaskSummary } from "components/Schedule-components/TaskSummary";

export const Home = () => {
    
    const colourSchemeState = useSelector((store) => store.user.toggleColourscheme);

    return (
        <ThemeProvider theme={colourSchemeState === "unchecked" ? LightTheme : DarkTheme}>
            <GlobalStyle />        
            <BrowserRouter>
                <Switch>
                <Route path="/" exact >
                    <SignupLogin />
                </Route>
                <Route path="/schedule">
                    <Schedule />                            
                </Route>
                <Route path="/notespage">
                    <NotesPage />                            
                </Route>
                <Route path="/addtask">
                    <AddEditTask />                            
                </Route>
                <Route path="/taskSummary/:taskId">
                    <TaskSummary />
                </Route>
                <Route path="/edittask">
                    <AddEditTask /> 
                </Route>
                <Redirect to="/" />
                </Switch>       
            </BrowserRouter>
        </ThemeProvider>
    );
};