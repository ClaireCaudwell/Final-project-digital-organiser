import React from "react";
import { useSelector } from "react-redux";

import { TimeTask } from "./TimeTask";

export const WeeklyTask = ({ tasks, dayIndex }) => {
    // Getting first day of week from redux weeklySchedule.js 
    const firstDayOfWeek = useSelector((store) => store.weeklySchedule.weeklySchedule.firstDayOfWeek);

    // Taking the firstDayOfTheWeek which is a string of the date and time for the first day of the week
    // Converting it to a date using the new date object so we can use date methods on it
    // Then getting the day of the month for that date using getDate method
    // Then using the setDate method to set the day of the date, taking the first day of the week and incremeting this based on the dayIndex number by 1.
    // The date is converted to a string in English which will be e.g. 01/01/21 etc
    // Then the date is covnverted to the day of the week e.g. "Monday"
    const date = new Date(firstDayOfWeek);
    const firstDayOfWeekDateNumber = date.getDate();
    date.setDate(firstDayOfWeekDateNumber+dayIndex);
    const weekDate = date.toLocaleDateString();
    const weekday = date.toLocaleString([], {weekday: 'long'});

    return (
        <div className="task-container">
            <div className="week-day-container">
                <p className="week-day">{weekday}</p>
                <p>{weekDate}</p>
            </div>
            {tasks.map(task => (
                <TimeTask task={task} key={task._id} />
            ))}            
        </div>
    );
};