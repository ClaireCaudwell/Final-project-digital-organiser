import React, { useEffect, useState } from "react";
import { useSelector, useDispatch  } from "react-redux";
import { NavLink } from "react-router-dom";
import moment from "moment";

import { ScheduleCalendar } from "../components/Schedule-components/ScheduleCalendar";
import { getOrganiser, user } from "../reducer/user";
import { Header } from "../components/Header-components/Header";
import { AddTaskButton } from "../components/Schedule-components/AddTaskButton";
import { WeeklySchedule } from "../components/Schedule-components/WeeklySchedule";
import { weeklySchedule, getSchedule } from "../reducer/weeklySchedule";

import "./Schedule.css";

export const Schedule = () => {
    const dispatch = useDispatch();
    const [number, setNumber] = useState(0);

    const userId = useSelector((store) => store.user.login.userId);
    const accessToken = useSelector((store) => store.user.login.accessToken);
    const authorized = useSelector((store) => store.user.login.authorized);
    // Today's date from redux
    const selectedDate = useSelector((store) => store.weeklySchedule.schedule.selectedDate);

    // Getting the monday for the current week based on today's date
    const monday = moment(selectedDate).startOf('isoWeek').toISOString();
    // Gets current week based on today's date
    const currentWeek = moment(selectedDate).isoWeek();

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

    // if authorized is then this second use effect is triggered
    useEffect(() => {
        if(authorized){
            // dispatch to get schedule using userId and monday 
            dispatch(getSchedule(userId, monday));
            // set current week to week based on today's date
            // dispatch(weeklySchedule.actions.setWeekNumber(currentWeek));
            // Clear error message if fetch wasn't successful
            dispatch(weeklySchedule.actions.setErrorMessage({ errorMessage: null }));
        }    
    }, [dispatch, userId, monday, authorized]);

    const setToday = () => {
        dispatch(weeklySchedule.actions.setSelectedDate({ selectedDate: new Date().toISOString() }));
        setNumber(Math.random());
    };

    return (
        <>
            <Header />
            <main className="main-container">
                <p className="select-calendar-text schedule-div">Select a date in the calendar to get your schedule for that week</p>
                <section className="section-container">
                    <h2 className="week-text">Week {currentWeek}</h2>
                    <NavLink to="/schedule" className="today">
                        <button type="button" onClick={setToday}>
                            Today
                        </button>
                    </NavLink>
                </section>
                <ScheduleCalendar number={number} />
                <AddTaskButton />
                <WeeklySchedule />
            </main>     
        </>
    )
};