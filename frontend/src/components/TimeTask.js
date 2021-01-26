import React from "react";
import { NavLink } from "react-router-dom";

export const TimeTask = ({ task }) => {

    const taskId = task._id;

        // Convert startdatetime which is a string to a date
        // Then using toLocaleTimeString to target the date's time and format it into a string showing the hour and mins 
        const time = new Date(task.startdatetime);
        const taskTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <NavLink to={`/taskSummary/${taskId}`} className="link">
            <div className="time-task-container">
                <p>{task.task}</p>
                <p className="heavy-text">{taskTime}</p>
            </div>
        </NavLink>
    );
};