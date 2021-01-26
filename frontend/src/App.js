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
import { AddScheduleTask } from "components/AddScheduleTask";
import { TaskSummary } from "components/TaskSummary";

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
              <AddScheduleTask />                            
          </Route>
          <Route path="/taskSummary/:userid">
            <TaskSummary />
          </Route>
          <Redirect to="/" />
        </Switch>       
      </BrowserRouter>
    </Provider>
  )
};
