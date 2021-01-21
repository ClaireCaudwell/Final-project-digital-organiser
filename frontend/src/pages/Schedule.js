import React, { useEffect } from "react";
import { useSelector, useDispatch  } from "react-redux";

import { getOrganiser } from "../reducer/user";
import { Header } from "../components/Header";
import { Calendar } from "../components/Calendar";
import { AddScheduleTaskButton } from "../components/AddScheduleTaskButton";
import { WeeklySchedule } from "../components/WeeklySchedule";

export const Schedule = () => {
    const dispatch = useDispatch();
    const userId = useSelector((store) => store.user.login.userId);
    const accessToken = useSelector((store) => store.user.login.accessToken);

    //useEffect allow for the dispatch to be done when the Schedule component is mounted. This dispatch will trigger the fetch in the user.js redux store and authenticate the user so using the accessToken. If the user doesn't sign up or login with the correct credentials then an accessToken is never created.
    //
    useEffect(() => {
        // dispatch(user.actions.setErrorMessage({ errorMessage: null }))
        dispatch(getOrganiser(userId, accessToken));
    },[userId, accessToken, dispatch]);
    
    // As soon as the Organiser.js is rendered then a get request is done, to get all the schedule items for that user, for that week. The accessToken is sent in headers as authorization and the response will and array of objects
    // From here the user can choose to add a new schedule item, click on a schedule item to render the schedule summary 
    // From the schedule summary the user can edit or delete the schedule item
    
    return (
        <>
            <Header />
            <main>
                <div className="schedule-component-container">
                    <h2>Week number</h2>
                </div>
                <Calendar />
                <AddScheduleTaskButton />
                <WeeklySchedule />
            </main>        
        </>
    )
};