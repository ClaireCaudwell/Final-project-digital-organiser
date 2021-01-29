import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink } from 'react-router-dom';
import moment from 'moment';

import { getTask, task, deleteTask } from "../reducer/task";
import { getSchedule } from "../reducer/weeklySchedule";
import { AddEditScheduleTask } from "./AddEditScheduleTask";

export const TaskSummary = () => {
    const { taskId } = useParams();
    const dispatch = useDispatch();
    const userId = useSelector((store) => store.user.login.userId);
    const taskDescription = useSelector((store) => store.task.scheduleTask.task);
    const startdatetime = useSelector((store) => store.task.scheduleTask.startdatetime);
    const monday = useSelector((store) => store.weeklySchedule.schedule.firstDayOfWeek);

    const [ editPage, setEditPage ] = useState(false);

    // Before component renders dispatch is done to get the task from the database
    useEffect(() => {
        dispatch(getTask(taskId, userId));
    }, [taskId, userId, dispatch]);

    // Converting the of the week e.g. Monday
    const weekday = moment(startdatetime).format("dddd");
    // Converting the date e.g. 10/10/21
    const date = moment(startdatetime).format("DDD/MM/YY");
    // Converting the time
    const time = moment(startdatetime).format("HH:mm");

    // Functioned called when user clicks on edit button
    // Dispatches to the task.js updating the deitPage to true which helps with showing only the specific button and header for the edit page
    // Also sets the useState editPage to true showing the AddEditScheduleTask component
    const handleEdit = (event) => {
        event.preventDefault();
        dispatch(task.actions.setEditPage(true));
        setEditPage(true);
    };

    // Function called when the user clicks on the delete button
    // Sends fetch request to backend using the userId (from redux user store) and taskId (from use Params)
    // Response back is a status message ("Task deleted") or errorMessage("User ID not found" or "Task ID not found")
    const handleDelete = (event) => {
        event.preventDefault();
        dispatch(deleteTask(userId, taskId));
        dispatch(getSchedule(userId, monday));
    };

    return (
        <>
        {!editPage ? (
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
            <p>{taskDescription}</p>
            <p className="heavy-text">{time}</p>
            <div className="button-container">
            {/* <NavLink className="link" to="/addedittask"> */}
                <button type="submit" onClick={handleEdit}>EDIT</button>
            {/* </NavLink> */}
                <button type="button" onClick={handleDelete}>DELETE</button>
            </div>
        </section>
        ) : (
            <AddEditScheduleTask />
        )}
        </>     
    );
};