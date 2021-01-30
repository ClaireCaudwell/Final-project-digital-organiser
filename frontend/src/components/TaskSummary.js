import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink } from 'react-router-dom';

import moment from 'moment';

import { getTask, deleteTask, task } from "../reducer/task";
import { getSchedule } from "../reducer/weeklySchedule";
import { Schedule } from "../pages/Schedule";

export const TaskSummary = () => {
    const { taskId } = useParams();
    const dispatch = useDispatch();
    const userId = useSelector((store) => store.user.login.userId);
    const taskDescription = useSelector((store) => store.task.scheduleTask.task);
    const statusMessage = useSelector((store => store.task.scheduleTask.statusMessage));
    const startdatetime = useSelector((store) => store.task.scheduleTask.startdatetime);
    const monday = useSelector((store) => store.weeklySchedule.schedule.firstDayOfWeek);

    const [ clearMessage, setClearMesssage ] = useState(false);
    const [ page, setPage ] = useState(false);

    // Before component renders dispatch is done to get the task from the database
    useEffect(() => {
        dispatch(getTask(taskId, userId));
        setClearMesssage(true);
    }, [taskId, userId, dispatch]);

    // Converting the of the week e.g. Monday
    const weekday = moment(startdatetime).format("dddd");
    // Converting the date e.g. 10/10/21
    // const date = moment(startdatetime).format("DDD/MM/YY");
    const date = new Date(startdatetime).toLocaleDateString();  

    // Converting the time
    const time = moment(startdatetime).format("HH:mm");

    // Function called when the user clicks on the delete button
    // Sends fetch request to backend using the userId (from redux user store) and taskId (from use Params)
    // Response back is a status message ("Task deleted") or errorMessage("User ID not found" or "Task ID not found")
    const handleDelete = (event) => {
        event.preventDefault();
        dispatch(deleteTask(userId, taskId));
        dispatch(getSchedule(userId, monday));
        setPage(true);
    };

    const handleClearMessage = () => {
        if(clearMessage) {
            dispatch(task.actions.setStatusMessage({ statusMessage: null })); 
        }
        dispatch(task.actions.clearState());
    };

    const handleOnEditClick = () => {
        if(clearMessage) {
            dispatch(task.actions.setStatusMessage({ statusMessage: null })); 
        }
    };

    return (
        <>
            {!page ? (
            <section className="schedule-component-container">
                <NavLink to="/schedule" className="back-link">
                    <div className="close-button-container">
                        <button className="close-button" type="button" onClick={handleClearMessage}>x</button> 
                    </div>
                </NavLink>
                <h2 className="summary-text">Task summary</h2>
                <div className="week-day-container no-background">
                    <p>{weekday}</p>
                    <p>{date}</p>
                </div>
                <p>{taskDescription}</p>
                <p className="heavy-text">{time}</p>
                <div className="button-container">
                <NavLink className="link" to="/edittask">
                    <button type="button" onClick={handleOnEditClick}>EDIT</button>
                </NavLink>
                <button type="button" onClick={handleDelete}>DELETE</button>
                </div>
                {statusMessage && <p>{`${statusMessage}`}</p>}
            </section>
            ) : (
                <Schedule />
            )}
        </>     
    );
};