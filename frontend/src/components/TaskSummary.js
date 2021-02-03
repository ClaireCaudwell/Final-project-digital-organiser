import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink } from 'react-router-dom';

import moment from 'moment';

import { getTask, deleteTask, task } from "../reducer/task";

export const TaskSummary = () => {
    const { taskId } = useParams();
    const dispatch = useDispatch();
    const userId = useSelector((store) => store.user.login.userId);
    const taskDescription = useSelector((store) => store.task.scheduleTask.task);
    const statusMessage = useSelector((store => store.task.scheduleTask.statusMessage));
    const startdatetime = useSelector((store) => store.task.scheduleTask.startdatetime);

    const [ taskDeleted, setTaskDeleted ] = useState(false);

    // Before component renders dispatch is done to get the task from the database
    useEffect(() => {
        if(!taskDeleted){
            dispatch(getTask(taskId, userId));
        }
        // dispatch(task.actions.setStatusMessage({ statusMessage: null}));
    }, [taskId, userId, dispatch, taskDeleted]);

    // Converting the of the week e.g. Monday
    const weekday = moment(startdatetime).format("dddd");
    // Converting the date e.g. 10/10/21
    const date = new Date(startdatetime).toLocaleDateString();  

    // Converting the time
    const time = moment(startdatetime).format("HH:mm");

    // Function called when the user clicks on the delete button
    // Sends fetch request to backend using the userId (from redux user store) and taskId (from use Params)
    // Response back is a status message ("Task deleted") or errorMessage("User ID not found" or "Task ID not found")
    const handleDelete = () => {
        dispatch(deleteTask(userId, taskId));
        dispatch(task.actions.setStatusMessage({ statusMessage: null}));
        setTaskDeleted(true);
    };

    const handleClose = () => {
        dispatch(task.actions.clearState());
        dispatch(task.actions.setStatusMessage({ statusMessage: null}))
    };

    const handleEdit = () => {
        dispatch(task.actions.setStatusMessage({ statusMessage: null })); 
    };

    return (
        <section className="schedule-component-container">
            <NavLink to="/schedule" className="back-link">
                <div className="close-button-container">
                    <button className="close-button" type="button" onClick={handleClose}>close</button> 
                </div>
            </NavLink>
        {!taskDeleted ? (
            <>
            <h2 className="summary-text">Task summary</h2>
            <div className="week-day-container no-background">
                <p>{weekday}</p>
                <p>{date}</p>
            </div>
            <p>{taskDescription}</p>
            <p className="heavy-text">{time}</p>
            <div className="button-container">
                <NavLink className="link" to="/edittask">
                    <button type="button" onClick={handleEdit}>EDIT</button>
                </NavLink>
                <button type="button" onClick={handleDelete}>DELETE</button>
            </div>
            </>
        ) : (
            <p>{statusMessage}</p>
        )}
        </section>
    );
};