import React, { useEffect } from "react";
import { useSelector, useDispatch  } from "react-redux";
import moment from 'moment';

import { Week } from "../components/Week";
import { ScheduleCalendar } from "../components/ScheduleCalendar";
import { getOrganiser, user } from "../reducer/user";
import { Header } from "../components/Header";
import { AddTaskButton } from "../components/AddTaskButton";
import { WeeklySchedule } from "../components/WeeklySchedule";
import { weeklySchedule, getSchedule } from "../reducer/weeklySchedule";

export const Schedule = () => {
    const dispatch = useDispatch();

    const userId = useSelector((store) => store.user.login.userId);
    const accessToken = useSelector((store) => store.user.login.accessToken);
    const authorized = useSelector((store) => store.user.login.authorized);
    // Date for start of week based on today's date
    const monday = useSelector((store) => store.weeklySchedule.schedule.firstDayOfWeek);

    // UseEffect actions following code before Schedule.js is mounted
    // If userId exists in redux and authorized in redux is not true then 
    useEffect(() => {
        if(userId && !authorized){
            // Dispatch to endpoint that authenticates the user
            dispatch(getOrganiser(userId, accessToken));
            // Set authorized property in initial state as true
            dispatch(user.actions.setAuthorized({ authorized: true }));
        }
        // Clear error message that was shown if user logs in or signs up unsuccessfully
        dispatch(user.actions.setErrorMessage({ errorMessage: null }));
    },[dispatch, userId, accessToken, authorized]);

    // Gets current week based on today's date
    const currentWeek = moment(monday).isoWeek();

    // if authorized is then this second use effect is triggered
    useEffect(() => {
        if(authorized){
            // dispatch to get schedule using userId and monday 
            // Monday is the firstDayOfWeek from redux store and is the date for Monday of the week based on today's date
            dispatch(getSchedule(userId, monday));
            // set current week to week based on today's date
            dispatch(weeklySchedule.actions.setWeekNumber(currentWeek));
            // Clear error message if fetch wasn't successful
            dispatch(weeklySchedule.actions.setErrorMessage({ errorMessage: null }));
        }    
    }, [dispatch, userId, monday, authorized, currentWeek]);

    return (
        <>
            <Header />
            <main>
                <Week />               
                <p className="schedule-component-container">Please select a week number in the calendar to see your schedule for that week</p>
                <ScheduleCalendar />
                <AddTaskButton />
                <WeeklySchedule />
            </main>     
        </>
    )
};