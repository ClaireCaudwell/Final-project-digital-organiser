import React from "react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { user } from "./reducer/user";
import { scheduleItem } from "./reducer/item";
import { SignupLogin } from "components/SignupLogin";

const reducer = combineReducers({ user: user.reducer, scheduleitem: scheduleItem.reducer });
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
