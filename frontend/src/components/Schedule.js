import React from "react";
import { useSelector } from "react-redux";

// import { user } from "../reducer/user";


export const Schedule = () => {
    const userCreatedMessage = useSelector((store) => store.user.login.statusMessage);
    const username = useSelector((store) => store.user.login.username);
    
    
    return (
        <section>
            <p>Hi {username}. Welcome to your organiser</p>
            <p>{userCreatedMessage}</p>
        </section>
    )
};