import React from "react";
import { useSelector } from "react-redux"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styled-components/GlobalStyle";
// import { lightTheme, darkTheme } from "./styled-components/Themes";
import LightTheme from "./styled-components/LightTheme";
import DarkTheme from "./styled-components/DarkTheme";

import { SignupLogin } from "./pages/SignupLogin";
import { Schedule } from "./pages/Schedule";
import { NotesPage } from "./pages/NotesPage";
import { AddTask } from "components/Schedule-components/AddTask";
import { TaskSummary } from "components/Schedule-components/TaskSummary";
import { EditTask } from "./components/Schedule-components/EditTask";

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
                    <AddTask />                            
                </Route>
                <Route path="/taskSummary/:taskId">
                    <TaskSummary />
                </Route>
                <Route path="/edittask">
                    <EditTask />
                </Route>
                <Redirect to="/" />
                </Switch>       
            </BrowserRouter>
        </ThemeProvider>
    );
};