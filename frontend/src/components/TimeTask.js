import React from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";

export const TimeTask = ({ task }) => {

    const taskId = task._id;
    // Converting the startdatetime which is a string to a date with hours and mins
    const time = moment(task.startdatetime).format("HH:mm");

    return (
        <NavLink to={`/taskSummary/${taskId}`} className="link">
            <div className="time-task-container">
                <p className="task">{task.task}</p>
                <p className="heavy-text">{time}</p>
            </div>
        </NavLink>
    );
};