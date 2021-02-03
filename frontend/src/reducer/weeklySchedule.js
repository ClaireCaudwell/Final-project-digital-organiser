import { createSlice } from "@reduxjs/toolkit";
import moment from 'moment';

const initialState = { 
    schedule: {
        weeklyTasks: [],
        week: null,
        firstDayOfWeek: moment().startOf('isoWeek').toISOString(),
        //Date for start of week based on today's date and convert to ISO string 
        selectedDate: moment().startOf('isoWeek').toISOString(),
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
        setWeekNumber: (state, action) => { 
            state.schedule.week = action.payload;
        },
        // Getting back in the json response from the GET endpoint the start of week date that we sent in. This is a new Date for the first day of the week that corresponds to the week number the user clicks on
        setStartOfWeek: (state, action) => {
            const { startOfWeek } = action.payload;
            state.schedule.firstDayOfWeek = startOfWeek;
        },
        setSelectedDate: (state, action) => {
            state.schedule.selectedDate = action.payload.selectedDate;
        },
        setErrorMessage: (state, action) => {
            const { errorMessage } = action.payload;
            state.schedule.errorMessage = errorMessage; 
        },
        setLogout: (state) => {
            state.schedule.firstDayOfWeek = moment().startOf('isoWeek').toISOString();
            state.schedule.selectedDate = moment().startOf('isoWeek').toISOString();
            state.schedule.weeklyTasks = [];
            state.schedule.week = null;
        }
    },
});

// Thunk for doing the GET request to get the schedule tasks for the week from. 
// Based on the date for the beginning of the week
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
            dispatch(weeklySchedule.actions.setStartOfWeek({ startOfWeek: json.startOfWeek }));
        })
        .catch((error) => {
            dispatch(weeklySchedule.actions.setErrorMessage({ errorMessage: error.toString() }));
        })
    };
};