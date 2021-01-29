import React from "react";
import { useSelector } from "react-redux";
// import moment from 'moment';

import { TimeTask } from "./TimeTask";

export const WeeklyTask = ({ tasks, dayIndex }) => {
    // Getting first day of week from redux store 
    const firstDayOfWeek = useSelector((store) => store.weeklySchedule.schedule.firstDayOfWeek);
    
    // --- The below code helps to show and format each day and date of the week in the schedule --- //

    // Using the firstDayOfTheWeek, e.g. date for the Monday from redux which is sent from the backend to convert it from a string to a date object
    const date = new Date(firstDayOfWeek);
    // Then use the date (firstDayOfWeek) to get the day of the month using getDate(), will be number e.g. if the first day of the week is the 28th it will be 28 
    const firstDayOfWeekDateNumber = date.getDate();
    // Then use the date (firstDayOfWeek) and set the day of the month using the monday date above e.g. 28.
    // Then increment this date based using the dayIndex which is the index number of each of the arrays in the weeklyTasksArray
    date.setDate(firstDayOfWeekDateNumber+dayIndex);

    // Then for each day, can use the date, to format the weekday and week date the way I want them to be
    // Converting the day of the week e.g. Monday
    // const weekday = moment(date).format("dddd");
    // Converting the date e.g. 10/10/21
    // const weekdate = moment(date).format("DDD/MM/YY"); 
    
    // Converting the day of the week e.g. Monday
    const weekday = date.toLocaleString([], {weekday: 'long'});
    // Converting the date e.g. 10/10/21
    const weekdate = date.toLocaleDateString();  

    // Show the day and date of the week
    // Then map through the tasks into the TimeTask component as there may be more than one task for that day of the week
    return (
        <div className="task-container">
            <div className="week-day-container">
                <p className="heavy-text">{weekday}</p>
                <p>{weekdate}</p>
            </div>
            {tasks.map(task => (
                <TimeTask task={task} key={task._id} dayIndex={dayIndex} />
            ))}           
        </div>
    );
};