import React from "react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { user } from "./reducer/user";
import { task } from "./reducer/task";
import { SignupLogin } from "./components/SignupLogin";
import { Schedule } from "./components/Schedule";
import { Notes } from "./components/Notes";
import { AddScheduleTask } from "components/AddScheduleTask";

const reducer = combineReducers({ user: user.reducer, task: task.reducer });
const store = configureStore({ reducer: reducer });

export const App = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
          <>
              <Switch>
                  <Route path="/" exact>
                    <SignupLogin />                            
                  </Route>
                  <Route path="/schedule">
                      <Schedule />                            
                  </Route>
                  <Route path="/notes">
                      <Notes />                            
                  </Route>
                  <Route path="/addtask">
                      <AddScheduleTask/>                            
                  </Route>
              </Switch>
          </>        
      </BrowserRouter>
    </Provider>
  )
};
