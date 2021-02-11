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
import { AddTask } from "../components/Schedule-components/AddTask";

import "./Schedule.css";
import "./MediaQueries.css";


export const Schedule = () => {
    const dispatch = useDispatch();
    
    const MOBILE_WIDTH_THRESHOLD = 750;
    
    const [ randomNumber, setRandomNumber ] = useState(0);
    const [ showAddTask, setShowAddTask ] = useState(window.innerWidth < MOBILE_WIDTH_THRESHOLD);

    const userId = useSelector((store) => store.user.login.userId);
    const accessToken = useSelector((store) => store.user.login.accessToken);
    const authorized = useSelector((store) => store.user.login.authorized);
    // Today's date from redux
    const selectedDate = useSelector((store) => store.weeklySchedule.schedule.selectedDate);

    // Getting the monday for the current week based on today's date
    const monday = moment(selectedDate).startOf('isoWeek').toISOString();
    // Gets current week based on today's date
    const currentWeek = moment(selectedDate).isoWeek();

    // If userId exists in redux and authorized in redux is false then organiser
    // POST endpoint is triggered. Stops from the endpoint being called everytime component is mounted
    useEffect(() => {
        if(userId && !authorized){
            dispatch(getOrganiser(userId, accessToken));
            dispatch(user.actions.setAuthorized({ authorized: true }));
        }
        dispatch(user.actions.setErrorMessage({ errorMessage: null }));
    },[dispatch, userId, accessToken, authorized]);

    // if authorized is true then this second use effect is triggered
    useEffect(() => {
        if(authorized){
            dispatch(getSchedule(userId, monday));
            dispatch(weeklySchedule.actions.setErrorMessage({ errorMessage: null }));
            // Listening to the window size and sending in the function showComponent
            window.addEventListener("resize", showComponent);
        }
        return () => {
            window.removeEventListener("resize", showComponent);
        }
    }, [dispatch, userId, monday, authorized]);

    // Will set the useState showAddTask state to true or false depending on the width of the screen size 
    // Renders specific components below based on the true or false state
    const showComponent = (event) => {
        if(window.innerWidth < MOBILE_WIDTH_THRESHOLD) {
            setShowAddTask(true);
        } else {
            setShowAddTask(false);
        }
    };

    // Today button that allows for the user to go back to todays date in the calendar
    // When button is clicked a random number is generated
    // Random number is passed as props into calendar component and used in the calendars key which is a number
    // This is a way to trigger a re-render of the calendar to show that the today date has been selected
    const setToday = () => {
        dispatch(weeklySchedule.actions.setSelectedDate({ selectedDate: new Date().toISOString() }));
        setRandomNumber(Math.random());
    };

    return (
        <>
            <Header />
            <main className="main-container desktop-view">
                <section className="inner-div">
                    <div className="left-column mobile-view">
                        <p className="select-calendar-text section-container">Select a date in the calendar to get your schedule for that week</p>
                        <div className="section-container">
                            <h2 className="week-text">Week {currentWeek}</h2>
                            <NavLink to="/schedule" className="today">
                                <button type="button" onClick={setToday}>
                                    Today
                                </button>
                            </NavLink>
                        </div>
                        <ScheduleCalendar randomNumber={randomNumber} />
                        {showAddTask && <AddTaskButton />}
                        {!showAddTask && <AddTask />}
                    </div>
                    <div className="right-column mobile-view">
                        <WeeklySchedule />
                    </div>
                </section>
            </main>     
        </>
    )
};