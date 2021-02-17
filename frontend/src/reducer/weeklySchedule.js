import { createSlice } from "@reduxjs/toolkit";
import moment from 'moment';

const initialState = { 
    schedule: {
        weeklyTasks: [],
        selectedDate: moment().toISOString(),
        errorMessage: null,
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
        setSelectedDate: (state, action) => {
            state.schedule.selectedDate = action.payload.selectedDate;
        },
        setErrorMessage: (state, action) => {
            const { errorMessage } = action.payload;
            state.schedule.errorMessage = errorMessage; 
        },
        setLogout: (state) => {
            state.schedule.selectedDate = moment().toISOString();
            state.schedule.weeklyTasks = [];
        }
    },
});

// Thunk for doing the GET request to get the schedule tasks for the week from. 
// Based on the date for the Monday date of that week
export const getSchedule = (userId, monday) => {
    return(dispatch) => {
        fetch(`http://localhost:8080/users/${userId}/scheduleweek/${monday}`, {
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