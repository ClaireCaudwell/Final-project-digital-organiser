import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";


import { Organiser } from "./Organiser";
import { user, userLogin } from "reducer/user";

const SIGNUP_URL = "http://localhost:8080/users";

export const SignupLogin = () => {
    const dispatch = useDispatch();
    const userId = useSelector((store) => store.user.login.userId);
    const error = useSelector((store) => store.user.login.errorMessage);
    const accessToken = useSelector((store) => store.user.login.accessToken);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // User submits username and password when they sign up
    // handleSignUp function is called and the fetch to the POST endpoint "/users" is done.
    // If success returned json data is dispatched to redux store
    // Finally username and password useState is set back to empty string
    const handleSignup = (event) => {
        event.preventDefault();

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
        })
        .catch((error) => { 
            dispatch(user.actions.setUsername({ username: null }));
            dispatch(user.actions.setErrorMessage({ errorMessage: error.toString()}));
        })
        .finally(() => {
            setUsername("");
            setPassword(""); 
        })
    };

    // If user already signed up then they can login
    // handleLogin function calles that dispatches the username and password to the redux store
    // username and password useState is set back to empty string
    const handleLogin = (event) => {
        event.preventDefault();
        dispatch(userLogin(username, password));
        setUsername("");
        setPassword(""); 
    };

    // if the accessToken hasn't been created i.e. the user hasn't signed up or logged in then the form will still be shown and error message will be shown
    // else the Organiser.js will be shown as the user has created a successful username/password a valid accessToken is dispatched to redux store.
    // Once the accessToken is true and before the Organiser.js is rendered the useEffect dispatches to the getOrganiser thunk in the redux store the userId and accessToken generated from a successfule sign up or login. 
    // The fetch and GET request is done in server.js which authenticates the accessToken and thus authenticates that the user exsists in the database which allows for the user is shown their organiser which will be rendered in Organiser.js.
    return (
        <>
        {!accessToken ? (
                <section>
                    <h1>Welcome</h1>
                    <p>Please enter your name and password to signup or login</p>
                    <form>
                        <input
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            minLength="3"
                            maxLength="20"
                            required                
                        /> 
                         <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            minLength="5"
                            required                
                        />             
                        <button type="submit" onClick={handleSignup}>SIGN UP</button>
                        <button type="submit" onClick={handleLogin}>LOGIN</button>
                    </form>
                    {userId === 0 && <p>{error}</p>}
                </section>
            ) : (
                <Organiser />
            )} 
        </>
    );
};