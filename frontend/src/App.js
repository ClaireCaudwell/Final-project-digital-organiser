import React from "react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { user } from "./reducer/user";
import { task } from "./reducer/task";
import { weeklySchedule } from "./reducer/weeklySchedule";
import { note } from "./reducer/note";
import { SignupLogin } from "./pages/SignupLogin";
import { Schedule } from "./pages/Schedule";
import { NotesPage } from "./pages/NotesPage";
import { AddTask } from "components/Schedule-components/AddTask";
import { TaskSummary } from "components/Schedule-components/TaskSummary";
import { EditTask } from "./components/Schedule-components/EditTask";

const reducer = combineReducers({ user: user.reducer, task: task.reducer, weeklySchedule: weeklySchedule.reducer, note: note.reducer });
const store = configureStore({ reducer: reducer });

export const App = () => {

  return (
    <Provider store={store}>      
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
          {/* <Route path="/addnote">
            <AddNote />
          </Route> */}
          <Redirect to="/" />
        </Switch>       
      </BrowserRouter>
    </Provider>
  )
};
