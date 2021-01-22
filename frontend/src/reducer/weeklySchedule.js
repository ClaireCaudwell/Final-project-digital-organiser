import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    weeklySchedule: [{}],
};

export const weeklySchedule = createSlice({
    name: "weeklySchedule",
    initialState: initialState,
    reducers: {
        getWeeklySchedule: (state, action) => {
            const { weeklySchedule } = action.payload;
            state.weeklySchedule = weeklySchedule;
        },
    },
});

//Thunk for doing the GET request
export const getSchedule = (userId, week, weekDate) => {
    return(dispatch) => {
        fetch(`http://localhost:8080/users/${userId}/scheduletask`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, week, weekDate })
        }
    )}
}

