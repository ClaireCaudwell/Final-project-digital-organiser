import React from "react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { user } from "./reducer/user";
import { task } from "./reducer/task";
import { SignupLogin } from "components/SignupLogin";

const reducer = combineReducers({ user: user.reducer, task: task.reducer });
const store = configureStore({ reducer: reducer });

export const App = () => {

  return (
    <Provider store={store}>
      <main>
        <SignupLogin /> 
      </main>    
    </Provider>
  )
};
