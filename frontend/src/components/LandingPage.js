import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { user } from "reducer/user";

const LOGIN_URL = "http://localhost:8080/user"

export const LandingPage = () => {
    const dispatch = useDispatch();
    const userId = useSelector((store) => store.user.login.userId);
    const error = useSelector((store) => store.user.login.errorMessage);

    const [username, setUsername] = useState("");

    const handleLoginSuccess = (loginresponse) => {
        dispatch(user.actions.setUsername({ username: loginresponse.username }));        
    };

    const handleLoginFailed = (error) => {
        dispatch(user.actions.setUsername({ username: null }));
        dispatch(user.actions.setErrorMessage({ errorMessage: error.toString()}));
    };

    const handleLogin = (event) => {
        event.preventDefault();

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
        .then((json) => handleLoginSuccess(json))
        .catch((err) => handleLoginFailed(err))
        .finally(()=> {
            setUsername("")
        });
    };

    return (
        <section>
            <h1>Welcome</h1>
            <p>Please enter your name to create a schedule</p>
            <form>
                <input
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    minLength="3"                
                />              
                <button type="submit" onClick={handleLogin}>ENTER</button>
            </form>
            {userId === 0 && <p>{error}</p>}
        </section>
    );
};