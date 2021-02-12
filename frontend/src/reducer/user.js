import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login: {
        userId: localStorage.userId || null,
        accessToken: localStorage.accessToken || null,
        username: localStorage.username || null,
        statusMessage: null,
        errorMessage: null, 
        authorized: false,
    },
    toggleColourscheme: null,
};

export const user = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUserId: (state, action) => {
            const { userId } = action.payload;
            localStorage.setItem("userId", userId);
            state.login.userId = userId; 
        },
        setAccessToken: (state, action) => {
            const { accessToken } = action.payload;
            localStorage.setItem("accessToken", accessToken);
            state.login.accessToken = accessToken;
        },
        setUsername: (state, action) => {
            const { username } = action.payload;
            localStorage.setItem("username", username);
            state.login.username = username;
        },
        setStatusMessage: (state, action) => {
            const { statusMessage } = action.payload;
            state.login.statusMessage = statusMessage; 
        },
        setErrorMessage: (state, action) => {
            const { errorMessage } = action.payload;
            state.login.errorMessage = errorMessage;
        },
        setAuthorized: (state, action) => {
            state.login.authorized = action.payload.authorized;
        },
        setColourScheme: (state, action) => {
            const { colourScheme } = action.payload;
            state.toggleColourscheme = colourScheme;
        },
        setLogOut: (state) => {
            state.login.userId = null;
            state.login.accessToken = null;
            state.login.username = null;
            state.login.authorized = false;
            localStorage.removeItem("userId");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("username");
        },
    },
});

// Thunk that's triggered by the user when they sign up or log in
// Does a fetch and a GET request sending the accessToken in headers which will allow for the Organiser.js to be rendered and the user will have access to their organiser
// If not successful e.g. they haven't created a valid username/password or inputted the correct credentials the the throw error is shown
export const getOrganiser = (userId, accessToken, authorized) => {
    return(dispatch) => {
        fetch(`http://localhost:8080/users/${userId}/organiser`,{
            method: "GET",
            headers: { Authorization: accessToken },
        })
        .then((res) => {
            if(!res.ok) {
                throw new Error(
                    "Couldn't get your organiser. Please check your username and password are correct"
                );
            } return res.json(); 
        })
        .then((json) => {
            dispatch(user.actions.setStatusMessage({ statusMessage: json.statusMessage }));
        })
        .catch((error) => {
            dispatch(user.actions.setErrorMessage({ errorMessage: error.toString()}))
        })
    };
};

const SIGNUP_URL = "http://localhost:8080/users";

export const userSignup = (username, password) => {
    return(dispatch) => {
        fetch(SIGNUP_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ username, password }),
        })
        .then((res) => {
            if(!res.ok) {
                throw new Error(
                    "Sign up failed. Please enter a valid username and password"
                );
            } return res.json();
        })
        .then((json) => {
            dispatch(user.actions.setAccessToken({ accessToken: json.accessToken })); 
            dispatch(user.actions.setUserId({ userId: json.userId}));
            dispatch(user.actions.setUsername({ username: json.username }));        
            dispatch(user.actions.setStatusMessage({ statusMessage: json.statusMessage})); 
            dispatch(user.actions.setErrorMessage({ errorMessage: json.errorMessage} ));   
        })
        .catch((error) => { 
            dispatch(user.actions.setUsername({ username: null }));
            dispatch(user.actions.setErrorMessage({ errorMessage: error.toString()}));
        })

    }
}
// Thunk and fetch for the user to login using the sessions endpoint
export const userLogin = (username, password) => {
    return(dispatch) => {
        fetch("http://localhost:8080/sessions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        })
        .then((res) => {
            if(!res.ok) {
                throw new Error(
                    "Login failed. Please check your username and password"
                );
            } return res.json(); 
        })               
        .then((json) => {
            dispatch(user.actions.setAccessToken({ accessToken: json.accessToken }));
            dispatch(user.actions.setUserId({ userId: json.userId}));      
            dispatch(user.actions.setUsername({ username: json.username }));        
            dispatch(user.actions.setStatusMessage({ statusMessage: json.statusMessage}));
            dispatch(user.actions.setAuthorized({ authorized: true})); 
        })
        .catch((error) => { 
            dispatch(user.actions.setUsername({ username: null }));
            dispatch(user.actions.setErrorMessage({ errorMessage: error.toString()}));
        })
    };
};
