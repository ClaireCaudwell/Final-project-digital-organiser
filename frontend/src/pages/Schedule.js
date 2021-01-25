import React, { useEffect, useState } from "react";
import { useSelector, useDispatch  } from "react-redux";
import Calendar from 'react-calendar';
import '../Calendar.css';

import { getOrganiser } from "../reducer/user";
import { Header } from "../components/Header";
import { AddScheduleTaskButton } from "../components/AddScheduleTaskButton";
import { WeeklySchedule } from "../components/WeeklySchedule";
import { getSchedule } from "../reducer/weeklySchedule";

export const Schedule = () => {
    const dispatch = useDispatch();
    const userId = useSelector((store) => store.user.login.userId);
    const accessToken = useSelector((store) => store.user.login.accessToken);

    const [ date, setDate ] = useState(new Date());
    const [ week, setWeek ] = useState(0);

    //useEffect allow for the dispatch to be done when the Schedule component is mounted. This dispatch will trigger the fetch in the user.js redux store and authenticate the user so using the accessToken. If the user doesn't sign up or login with the correct credentials then an accessToken is never created.
    //
    useEffect(() => {
        // dispatch(user.actions.setErrorMessage({ errorMessage: null }))
        dispatch(getOrganiser(userId, accessToken));
    },[userId, accessToken, dispatch]);
    
    // As soon as the Schedule.js is rendered then a get request is done, to get all the schedule items for that user, for that week. The accessToken is sent in headers as authorization and the response will and array of objects
    // From here the user can choose to add a new schedule item, click on a schedule item to render the schedule summary 
    // From the schedule summary the user can edit or delete the schedule item
    

    const onChange = (date) => {
        setDate(date);
    };

    const onSelectWeekNumber =  (weekNumber, date) => {
        setWeek(week => weekNumber);
        dispatch(getSchedule(userId, date));
    };

    // GET request that finds the user by ID and then filters the users ScheduleTask[{}] based on the week with the date that week starts on

    return (
        <>
            <Header />
            <main>
                <div className="schedule-component-container">
                    <h2>Week number</h2>
                </div>
                <div className="calendar-div">
                    <Calendar
                        value={date}
                        onChange={onChange}
                        showWeekNumbers
                        onClickWeekNumber={onSelectWeekNumber}
                    />
                </div>
                <AddScheduleTaskButton />
                <WeeklySchedule />
            </main>        
        </>
    )
};