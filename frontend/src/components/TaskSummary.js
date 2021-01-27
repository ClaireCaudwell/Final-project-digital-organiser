import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink } from 'react-router-dom';

import { getTask } from "reducer/task";


export const TaskSummary = () => {
    const { taskId } = useParams();
    const dispatch = useDispatch();
    const userId = useSelector((store) => store.user.login.userId);
    const task = useSelector((store) => store.task.scheduleTask.task);

    useEffect(() => {
        dispatch(getTask(taskId, userId));
    }, [taskId, userId, dispatch]);

    // Formatting the date 10/01/21 and weekday Monday
    // const date = new Date(firstDayOfWeek);
    // const firstDayOfWeekDateNumber = date.getDate();
    // date.setDate(firstDayOfWeekDateNumber+i);

    // const weekDate = date.toLocaleDateString();
    // const weekday = date.toLocaleString([], {weekday: 'long'});

    // Convert startdatetime which is a string to a date
    // Then using toLocaleTimeString to target the date's time and format it into a string showing the hour and mins 
    // const time = new Date(dateandtime);
    // const taskTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const handleDelete = (event) => {
        event.preventDefault();
        // dispatch()
    };

    return (
        <section className="schedule-component-container">
            <NavLink to="/schedule" className="back-link">
                <div className="close-button-container">
                    <button className="close-button" type="button">x</button> 
                </div>
            </NavLink>
            <h2 className="summary-text">Schedule summary</h2>
            <div className="week-day-container no-background">
                <p>Weekday</p>
                <p>Date</p>
            </div>
            <p>{task}</p>
            <p className="heavy-text">Time</p>
            <div className="button-container">
                <button type="button">EDIT</button>
                <button type="submit" onClick={handleDelete}>DELETE</button>
            </div>         
        </section>
    );
};