import React, { useEffect, useState } from "react";
import { useSelector, useDispatch  } from "react-redux";
import Calendar from 'react-calendar';

import '../Calendar.css';

import { getOrganiser } from "../reducer/user";
import { Header } from "../components/Header";
import { AddScheduleTaskButton } from "../components/AddScheduleTaskButton";
import { WeeklySchedule } from "../components/WeeklySchedule";
import { getSchedule, weeklySchedule } from "../reducer/weeklySchedule";

export const Schedule = () => {
    const dispatch = useDispatch();
    const userId = useSelector((store) => store.user.login.userId);
    const accessToken = useSelector((store) => store.user.login.accessToken);
    // const weekNumber = useSelector((store) => store.weeklySchedule.weeklySchedule.week);

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

    // Sets weekNumber to week in setWeek
    // Dispatches the userId and date (new date for the start of the week based on the week number the user clicks) to the weeklySchedule.js redux store and GET endpoint that fetches all of the tasks for the week
    // Also setting weel number to the week the user clicks on in the calendar
    const onSelectWeekNumber =  (weekNumber, date) => {
        setWeek(week => weekNumber);
        dispatch(getSchedule(userId, date));
        dispatch(weeklySchedule.actions.setWeekNumber(weekNumber));
    };

    // if(accessToken) {
    //     date
    // }

    // 1. When user signs up or logs in I want the week number and weekdays to be set to the current week
    // 2. Also when user logs in I want the current weeks tasks to be shown - local storage? Automatic fetch? 

    return (
        <>
            <Header />
            <main>
                <div className="schedule-component-container">
                    <h2>Week {week}</h2>
                </div>
                <p className="schedule-component-container">Please select a week number in the calendar to see your schedule for that week</p>
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