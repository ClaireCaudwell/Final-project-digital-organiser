import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { userLogin } from "reducer/user";
import { Schedule } from "./Schedule";


export const LandingPage = () => {
    const dispatch = useDispatch();
    const userId = useSelector((store) => store.user.login.userId);
    const error = useSelector((store) => store.user.login.errorMessage);
    const accessToken = useSelector((store) => store.user.login.accessToken);

    const [username, setUsername] = useState("");

    // function prevents the page from reloading as using submit
    // dispatching to the userLogin thunk in that's defined in user.js (redux store) passing the username stored in the username setState. 
    // This is then set back to an empty string when the fetch is complete and the data has been returned
    const handleLogin = (event) => {
        event.preventDefault();
        dispatch(userLogin(username));
        setUsername("");        
    };

    return (
        <>
            {!accessToken ? (
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
            ) : (
                <Schedule />
            )} 
        </>
    );
};