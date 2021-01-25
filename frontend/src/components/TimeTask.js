import React from "react";

export const TimeTask = ({ task }) => {

        // Converting time so it only shows e.g. 12:00
        const time = new Date(task.startdatetime);
        const taskTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <>
            <p>{task.task}</p>
            <p>{taskTime}</p>
        </>
    );
};