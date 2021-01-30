import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    scheduleTask: {
        taskId: 0,
        task: null,
        startdatetime: null,
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
        setStartDateTime: (state, action) => {
            const { startdatetime } = action.payload;
            state.scheduleTask.startdatetime = startdatetime; 
        },
        setStatusMessage: (state, action) => {
            const { statusMessage } = action.payload;
            state.scheduleTask.statusMessage = statusMessage; 
        },
        setErrorMessage: (state, action) => {
            const { errorMessage } = action.payload;
            state.scheduleTask.errorMessage = errorMessage; 
        },
        clearState: (state, action) => {
            state.scheduleTask.taskId = 0;
            state.scheduleTask.task = null;
            state.scheduleTask.startdatetime = null;   
        },
    }
});

// Thunk for fetch to POST endpoint to add a schedule task
export const addTask = (scheduletask, userId, startDateTime) => {
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
            dispatch(task.actions.setStartDateTime({ startdatetime: json.startdatetime }));
        })
        .catch((error) => {
            dispatch(task.actions.setErrorMessage({ errorMessage: error.toString()}));
        })
    };
};

// Thunk to get the task when the user clicks on the task in the summary. The data received back in json is sent into the taskSummary.js
export const getTask = (taskId, userId) => {
    return(dispatch) => {
        fetch(`http://localhost:8080/users/${userId}/scheduletask/${taskId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json"},
    })
    .then((res) => {
        return res.json();
    })
    .then((json) => {
        dispatch(task.actions.setTaskId({ taskId: json.taskId }));
        dispatch(task.actions.setTask({ task: json.task }));
        dispatch(task.actions.setStartDateTime({ startdatetime: json.startdatetime }));
    })
    .catch((error) => {
        dispatch(task.actions.setErrorMessage({ errorMessage: error.error}));
    })
    };
};

// Thunk doing the dispatch to the PATCH endpoint that updates a task
export const editTask = (scheduletask, userId, startDateTime, taskid) => {
    return(dispatch) => {
        fetch(`http://localhost:8080/users/${userId}/scheduletask/${taskid}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ scheduletask, startDateTime }),
        })
        .then((res) => {
            if(!res.ok) {
                throw new Error(
                    "Couldn't update task"
                );
            } return res.json();
        })
        .then((json) => {
            dispatch(task.actions.setTaskId({ taskId: json.taskId }));
            dispatch(task.actions.setStatusMessage({ statusMessage: json.statusMessage}));
            dispatch(task.actions.setTask({ task: json.task }));
            dispatch(task.actions.setStartDateTime({ startdatetime: json.startdatetime }));
        })
        .catch((error) => {
            dispatch(task.actions.setErrorMessage({ errorMessage: error.error}));
        });
    };
};

// Thunk is called when user deletes task
// Does fetch to DELETE endpoint
export const deleteTask = (userId, taskId) => {
    return(dispatch) => {
        fetch(`http://localhost:8080/users/${userId}/scheduletask/${taskId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
            if(!res.ok) {
                throw new Error(
                    "Couldn't delete task"
                );
            } return res.json();
        })
        .then((json) => {
            dispatch(task.actions.setStatusMessage({ statusMessage: json.statusMessage}));
            dispatch(task.actions.setTaskId({ taskId: 0 }));
            dispatch(task.actions.setTask({ task: null }));
            dispatch(task.actions.setStartDateTime({ startdatetime: null }));
        })
        .catch((error) => {
            dispatch(task.actions.setErrorMessage({ errorMessage: error.toString()}));
        })
    };
};