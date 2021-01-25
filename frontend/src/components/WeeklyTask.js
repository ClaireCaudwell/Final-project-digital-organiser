import React from "react";

export const WeeklyTask = ({ task }) => {

    // Weekday
    const day = new Date(task.startdatetime);
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const weekDay = days[day.getDay()];

    // Date 25-01-2021
    const date = new Date(task.startdatetime);
    const weekDate = date.toLocaleDateString('en-GB');

    // Time 11:00
    const time = new Date(task.startdatetime);
    const taskTime = time.toLocaleTimeString();

    return (
        <div className="task-container">
            <div className="week-day-container">
                <p className="week-day">{weekDay}</p>
                <p>{weekDate}</p>
            </div>
            <p>{task.task}</p>
            <p>{taskTime}</p>
        </div>
    );
};