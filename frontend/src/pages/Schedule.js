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
    
    // Gets current week based on today's date
    const currentWeek = moment().isoWeek();

    // User signs ups or logs in 
    // Before this component is mounted the dispatch to getOrganiser is done in user.js redux.
    // This is so the user can be authenticated and gain access to organiser page
    // Error message is set to null in case the login or sign up wasn't successful the first time. This is so it's not still there in redux store user.js when they are authenticated
    // Week number is set to the current week which will be shown in Schedule.js
    useEffect(() => {
        if(userId && !authorized){
            dispatch(getOrganiser(userId, accessToken));
            dispatch(user.actions.setAuthorized({ authorized: true}));
        }
        dispatch(user.actions.setErrorMessage({ errorMessage: null }));
        dispatch(weeklySchedule.actions.setWeekNumber(currentWeek));
    },[dispatch, userId, accessToken, currentWeek, authorized]);

    // Get start of week date based on the today's date. Set it to ISO 8601, 12:00 am e.g. Mon Jan 25 2021 00:00:00 GMT+0100 
    const monday = moment().startOf('isoWeek');

    // dispatch is done to get the weekly schedule using the userId and the Monday date if the authorized is true i.e. meaning the user has logged in/signed up successfully 
    useEffect(() => {
        if(authorized){
            dispatch(getSchedule(userId, monday));
            dispatch(weeklySchedule.actions.setErrorMessage({ errorMessage: null }));
        }    
    }, [dispatch, monday, userId, authorized]);

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