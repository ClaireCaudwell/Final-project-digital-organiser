import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    scheduleTask: {
        taskId: 0,
        task: null,
        date: 0,
        time: 0,
        delete: false,
        statusMessage: null,
        errorMessage: null,
    }
};

export const task = createSlice({
    name: "task",
    initialState: initialState,
    reducers: {
        setTaskId: (state, action) => {
            const { taskId } = action.payload;
            state.scheduleTask.taskId = taskId; 
        },
        setTask: (state, action) => {
            const { task } = action.payload;
            state.scheduleTask.task = task; 
        },
        setStatusMessage: (state, action) => {
            const { statusMessage } = action.payload;
            state.scheduleTask.statusMessage = statusMessage; 
        },
        setErrorMessage: (state, action) => {
            const { errorMessage } = action.payload;
            state.scheduleTask.errorMessage = errorMessage; 
        },
    }
}); 