import React from "react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { user } from "./reducer/user";
import { task } from "./reducer/task";
import { weeklySchedule } from "./reducer/weeklySchedule";
import { note } from "./reducer/note";

import { Home } from "./pages/Home";

const reducer = combineReducers({ user: user.reducer, task: task.reducer, weeklySchedule: weeklySchedule.reducer, note: note.reducer });
const store = configureStore({ reducer: reducer });

export const App = () => {

  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};
