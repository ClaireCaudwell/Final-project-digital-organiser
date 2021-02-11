import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { userLogin, userSignup } from "reducer/user";

import "./SignUpLogin.css";

export const SignupLogin = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    
    const userId = useSelector((store) => store.user.login.userId);
    const error = useSelector((store) => store.user.login.errorMessage);
    const accessToken = useSelector((store) => store.user.login.accessToken);
    
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ buttonClick, setButtonClick ] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        if(buttonClick === "signup") {
            dispatch(userSignup(username, password));
        } 
        if(buttonClick === "login") {
            dispatch(userLogin(username, password));
        }
        setUsername("");
        setPassword("");        
    };

    // When access token is present in the user redux store
    // react router pushes to the /schedule path which renders the 
    // schedule component/page
    useEffect(() => {
        if(accessToken) {
            history.push("/schedule");
        }
    }, [accessToken, history]);

    return (
        <>
            <main>
                <div className="frontpage-header-div">
                    <h1>Organiser</h1>
                    <p>Sign up or login to get your organiser</p>
                </div>
                <div className="form-div">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                minLength="3"
                                maxLength="20"
                                required                 
                            />
                        <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                minLength="5"
                                maxLength="30"
                                required              
                            />
                        <button 
                            className="form-button" 
                            type="submit" 
                            onClick={() => setButtonClick("signup")}
                            >
                                Sign up
                            </button>
                        <button 
                            className="form-button" 
                            type="submit" 
                            onClick={() => setButtonClick("login")}>
                                Login
                        </button> 
                    </form>
                </div>
                {userId === null && <p className="error-message">{error}</p>}
            </main>
        </>
    );
};