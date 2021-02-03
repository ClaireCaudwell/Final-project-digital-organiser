import React from "react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { user } from "./reducer/user";
import { task } from "./reducer/task";
import { weeklySchedule } from "./reducer/weeklySchedule";
import { SignupLogin } from "./pages/SignupLogin";
import { Schedule } from "./pages/Schedule";
import { Notes } from "./pages/Notes";
import { AddTask } from "components/AddTask";
import { TaskSummary } from "components/TaskSummary";
import { EditTask } from "./components/EditTask";

const reducer = combineReducers({ user: user.reducer, task: task.reducer, weeklySchedule: weeklySchedule.reducer });
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
          <Route path="/notes">
              <Notes />                            
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
    </Provider>
  )
};
