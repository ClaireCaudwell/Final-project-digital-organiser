import React, { useEffect } from "react";
import { useSelector, useDispatch  } from "react-redux";

import { getOrganiser, user } from "../reducer/user";
import { Header } from "../components/Header";
import { Calendar } from "../components/Calendar";
import { AddScheduleTaskButton } from "../components/AddScheduleTaskButton";
import { WeeklySchedule } from "../components/WeeklySchedule";

export const Schedule = () => {
    const dispatch = useDispatch();
    const userId = useSelector((store) => store.user.login.userId);
    const accessToken = useSelector((store) => store.user.login.accessToken);

    //useEffect dispatches to the getOrganiser thunk in redux store passing the userId and accessToken stored in redux store
    // This allows for the user to be validated before the Organiser.js component is rendered to ensure that the user has an account or entered valid credentials
    useEffect(() => {
        dispatch(user.actions.setErrorMessage({ errorMessage: null }))
        dispatch(getOrganiser(userId, accessToken));
    },[userId, accessToken, dispatch]);
    
    // As soon as the Organiser.js is rendered then a get request is done, to get all the schedule items for that user, for that week. The accessToken is sent in headers as authorization and the response will and array of objects
    // From here the user can choose to add a new schedule item, click on a schedule item to render the schedule summary 
    // From the schedule summary the user can edit or delete the schedule item
    
    return (
        <>
            <Header />
            <main>
                <div className="week-number-text">
                    <h2>Week number</h2>
                </div>
                <Calendar />
                <AddScheduleTaskButton />
                <WeeklySchedule />
            </main>        
        </>
    )
};