import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    schedule: {
        weeklyTasks: [],
        errorMessage: null,
        week: null,
        firstDayOfWeek: null,
    }  
};

export const weeklySchedule = createSlice({
    name: "weeklySchedule",
    initialState: initialState,
    reducers: {
        setWeeklySchedule: (state, action) => {
            const { weeklySchedule } = action.payload;
            state.schedule.weeklyTasks = weeklySchedule;
        },
        setWeekNumber: (state, action) => {            
            state.schedule.week = action.payload;
        },
        // Getting back in the json response from the GET endpoint the start of week date that we sent in. This is a new Date for the first day of the week that corresponds to the week number the user clicks on
        setStartOfWeek: (state, action) => {
            state.schedule.firstDayOfWeek = action.payload.startOfWeek;
        },
        setErrorMessage: (state, action) => {
            const { errorMessage } = action.payload;
            state.schedule.errorMessage = errorMessage; 
        },
    },
});

// Thunk for doing the GET request to get the schedule tasks for the week from. 
// Based on the date for the beginning of the week
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
            dispatch(weeklySchedule.actions.setStartOfWeek({ startOfWeek: json.startOfWeek }));
        })
        .catch((error) => {
            dispatch(weeklySchedule.actions.setErrorMessage({ errorMessage: error.toString() }));
        })
    };
};