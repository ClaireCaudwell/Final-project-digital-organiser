import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    weeklySchedule: {
        weeklyTasks: [],
        errorMessage: null,
        week: null,
    }
};

export const weeklySchedule = createSlice({
    name: "weeklySchedule",
    initialState: initialState,
    reducers: {
        setWeeklySchedule: (state, action) => {
            const { weeklySchedule } = action.payload;
            state.weeklySchedule.weeklyTasks = weeklySchedule;
        },
        setWeekNumber: (state, action) => {            
            state.weeklySchedule.week = action.payload;
        },
        setErrorMessage: (state, action) => {
            const { errorMessage } = action.payload;
            state.weeklySchedule.errorMessage = errorMessage; 
        },
    },
});

//Thunk for doing the GET request
export const getSchedule = (userId, date) => {
    return(dispatch) => {
        fetch(`http://localhost:8080/users/${userId}/scheduleweek/${date}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
            if(!res.ok) {
                throw new Error(
                    "No schedule items"
                );
            } return res.json();
        })
        .then((json) => {
            dispatch(weeklySchedule.actions.setWeeklySchedule({ weeklySchedule: json.weeklySchedule }));
        })
        .catch((error) => {
            dispatch(weeklySchedule.actions.setErrorMessage({ errorMessage: error.toString() }));
        })
    };
};

// /users/:id/scheduleweek/:starttime