import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink } from 'react-router-dom';
import moment from 'moment';

import { getTask } from "reducer/task";

export const TaskSummary = () => {
    const { taskId } = useParams();
    const dispatch = useDispatch();
    const userId = useSelector((store) => store.user.login.userId);
    const task = useSelector((store) => store.task.scheduleTask.task);
    const startdatetime = useSelector((store) => store.task.scheduleTask.startdatetime);

    useEffect(() => {
        dispatch(getTask(taskId, userId));
    }, [taskId, userId, dispatch]);

    // Converting the of the week e.g. Monday
    const weekday = moment(startdatetime).format("dddd");
    // Converting the date e.g. 10/10/21
    const date = moment(startdatetime).format("DDD/MM/YY");
    // Converting the time
    const time = moment(startdatetime).format("HH:mm");

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
                <p>{weekday}</p>
                <p>{date}</p>
            </div>
            <p>{task}</p>
            <p className="heavy-text">{time}</p>
            <div className="button-container">
                <button type="button">EDIT</button>
                <button type="submit" onClick={handleDelete}>DELETE</button>
            </div>         
        </section>
    );
};