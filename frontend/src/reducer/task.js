import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    scheduleTask: {
        taskId: 0,
        task: null,
        startdate: null,
        starttime: null,
        delete: false,
        statusMessage: null,
        errorMessage: null,
    },
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
        setStartdate: (state, action) => {
            const { startdate } = action.payload;
            state.scheduleTask.startdate = startdate; 
        },
        setStarttime: (state, action) => {
            const { starttime } = action.payload;
            state.scheduleTask.starttime = starttime; 
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

//Thunk for when the user adds a schedule task
export const getTask = (scheduletask, userId, startDateTime) => {
    return(dispatch) => {
        fetch(`http://localhost:8080/users/${userId}/scheduletask`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ scheduletask, startDateTime }),
        })
        .then((res) => {
            if(!res.ok) {
                throw new Error(
                    "Couldn't retrieve task"
                );
            } return res.json();
        })
        .then((json) => {
            dispatch(task.actions.setTaskId({ taskId: json.taskId }));
            dispatch(task.actions.setStatusMessage({ statusMessage: json.statusMessage}));
            dispatch(task.actions.setTask({ task: json.task }));
            dispatch(task.actions.setStartdate({ startdate: json.startdate }));
            dispatch(task.actions.setStarttime({ starttime: json.starttime }));
        })
        .catch((error) => {
            dispatch(task.actions.setErrorMessage({ errorMessage: error.toString()}));
        })
    };
};