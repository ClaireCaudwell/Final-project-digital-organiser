import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login: {
        userId: 0,
        username: null,
        statusMessage: null,
        errorMessage: null, 
    }
};

export const user = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUsername: (state, action) => {
            const { username } = action.payload;
            state.login.username = username; 
        },
        setErrorMessage: (state, action) => {
            const { errorMessage } = action.payload;
            state.login.errorMessage = errorMessage; 
        },
    },
}) 