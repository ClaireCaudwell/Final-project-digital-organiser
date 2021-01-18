import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login: {
        userId: 0,
        accessToken: "",
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
        setAccessToken: (state, action) => {
            const { accessToken } = action.payload;
            state.login.accessToken = accessToken; 
        },
        setStatusMessage: (state, action) => {
            const { statusMessage } = action.payload;
            state.login.statusMessage = statusMessage; 
        },
        setErrorMessage: (state, action) => {
            const { errorMessage } = action.payload;
            state.login.errorMessage = errorMessage; 
        },
    },
});


//If json response from fetch is a success then the redux store will be updated with this data
// const handleLoginSuccess = (loginresponse) => {
//     dispatch(user.actions.setUsername({ username: loginresponse.username }));        
//     dispatch(user.actions.setAccessToken({ accessToken: loginresponse.accessToken }));
//     dispatch(user.actions.setStatusMessage({ statusMessage: loginresponse.statusMessage}));       
// };

//If json response from fetch fails then the redux store will be updated with this data including the throw message
// const handleLoginFailed = (error) => {
//     dispatch(user.actions.setUsername({ username: null }));
//     dispatch(user.actions.setErrorMessage({ errorMessage: error.toString()}));
// };

const LOGIN_URL = "http://localhost:8080/user"
//Thunk and fetch for when the user logs in
// if successful the username, accesstoken and status message will be dispatched to the initial state. 
// if failed then the throw error is dispatched to errorMessage in the intial state 
export const userLogin = (username) => {
    return(dispatch) => {
        fetch(LOGIN_URL, {
            method: "POST",
            body: JSON.stringify({ username }),
            headers: { "Content-Type": "application/json"},
        })
        .then((res) => {
            if(!res.ok) {
                throw new Error(
                    "Login failed. Please enter a valid username"
                );
            } return res.json();
        })
        .then((json) => {
            dispatch(user.actions.setUsername({ username: json.username }));        
            dispatch(user.actions.setAccessToken({ accessToken: json.accessToken }));
            dispatch(user.actions.setStatusMessage({ statusMessage: json.statusMessage}));       
        })
        .catch((error) => { 
            dispatch(user.actions.setUsername({ username: null }));
            dispatch(user.actions.setErrorMessage({ errorMessage: error.toString()}));
        })
    };
};