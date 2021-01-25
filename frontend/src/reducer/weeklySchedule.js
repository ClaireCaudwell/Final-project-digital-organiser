import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    weeklySchedule: {
        weeklyTasks: [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
        ],
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
            // Converting the string startdatetime to a date so it can be sorted below
            // Redux doesn't seem to like the new date method
            for (let i = 0; i < weeklySchedule.length; i++) {
                weeklySchedule[i].startdatetime = new Date(weeklySchedule[i].startdatetime);
            }
            // Function to sort each array object based on it's date
            const sortedSchedule = weeklySchedule.sort( (a,b) => {
                if (a.startdatetime > b.startdatetime) {
                    return 1;
                } else {
                    return -1;
                }
            });
            // Setting the weeklyTask to an empty array of 7 arrays
            state.weeklySchedule.weeklyTasks = [
                [],
                [],
                [],
                [],
                [],
                [],
                [],
            ];

            // For each object check it's day of the week e.g. 0, 1, 2, 3 etc
            // Based on that number push it to the empty array and give that array the day's number
            for ( let i = 0; i < sortedSchedule.length; i++ ) {
                // Checks each array object's date to get the day of the week i.e Monday is 0, Tuesday is 1 etc and Sunday will be 6
                let day = sortedSchedule[i].startdatetime.getDay() -1;
                if(day === -1) {
                    day = 6;
                }
                state.weeklySchedule.weeklyTasks[day].push(sortedSchedule[i]);
            }
        },
        setWeekNumber: (state, action) => {            
            state.weeklySchedule.week = action.payload;
        },
        // Getting back in the json response from the GET endpoint the start of week date that we sent in. This is a new Date for the first day of the week that corresponds to the week number the user clicks on
        setStartOfWeek: (state, action) => {
            state.weeklySchedule.firstDayOfWeek = action.payload.startOfWeek;
        },
        setErrorMessage: (state, action) => {
            const { errorMessage } = action.payload;
            state.weeklySchedule.errorMessage = errorMessage; 
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