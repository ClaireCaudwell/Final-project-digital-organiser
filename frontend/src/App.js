import React from "react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { user } from "./reducer/user";
import { LandingPage } from "components/LandingPage";

const reducer = combineReducers({ user: user.reducer});
const store = configureStore({ reducer });

export const App = () => {

  return (
    <Provider store={store}>
      <main>
        <LandingPage />
      </main>    
    </Provider>
  )
};
