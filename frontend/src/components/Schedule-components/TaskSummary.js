import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink } from 'react-router-dom';

import moment from 'moment';

import { getTask, deleteTask, task } from "../../reducer/task";

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
    }, [taskId, userId, dispatch, taskDeleted]);

    // Converting the of the week e.g. Monday
    const weekday = moment(startdatetime).format("dddd");
    // Converting the date e.g. 10/10/21
    const date = new Date(startdatetime).toLocaleDateString();  

    // Converting the time
    const time = moment(startdatetime).format("HH:mm");

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
        <section className="task-section desktop-view-tasksection">
            <div className="task-container desktop-view-taskcontainer">
                <NavLink to="/schedule" className="close-button-container">
                    <button type="button" onClick={handleClose}>close</button> 
                </NavLink>
                {!taskDeleted ? (
                    <>
                    <h2>Task summary</h2>
                    <div className="weekday-container-two">
                        <p>{weekday}</p>
                        <p>{date}</p>
                    </div>
                    <div className="time-task-container">
                        <p>{taskDescription}</p>
                        <p>{time}</p>
                    </div>
                    <div className="edit-delete-button-container">
                        <NavLink to="/edittask" className="no-link">
                            <button 
                                type="button" 
                                onClick={handleEdit}
                            >
                                <span className="material-icons">
                                    mode_edit
                                </span>
                                Edit
                            </button>
                        </NavLink>
                        <button
                            type="button" 
                            onClick={handleDelete}
                        >
                            <span className="material-icons">
                                delete
                            </span>
                            Delete
                        </button>
                    </div>
                    </>
                ) : (
                    <div className="delete-container">
                        <span className="material-icons larger-bin">delete</span>
                        <p className="status-message">{statusMessage}</p>
                    </div>
                )}
            </div>
        </section>
    );
};