import React from "react";
import { useSelector } from "react-redux";
import moment from 'moment';

import { TimeTask } from "./TimeTask";
import { PlansText, WeekdayContainer, WeekdayText } from "../../styled-components/Schedule";

export const WeeklyTask = ({ tasks, dayIndex }) => {
   // Today's date from redux
   const selectedDate = new Date(useSelector((store) => store.weeklySchedule.schedule.selectedDate));
   const dateSelected = selectedDate.toLocaleDateString();

   // Getting the monday for the current week based on today's date by converting using moment
   const monday = moment(selectedDate).startOf('isoWeek').toISOString();
    
    // --- The below code helps to show and format each day and date of the week in the schedule --- //
    // Using the monday date and converting to date object
    const date = new Date(monday);
    // Then use the date for the Monday of the week to get the number for that day using getDate() e.g. if Monday is the 28th it will be 28 
    const mondayDateNumber = date.getDate();
    // Then use the date (monday) and set the day of the month using the monday date above e.g. 28.
    // Then increment this date using the dayIndex which is the index number of each of the objects in the weeklyTasksArray
    date.setDate(mondayDateNumber+dayIndex); 
    
    // Converting the day of the week e.g. Monday
    const weekday = date.toLocaleString([], {weekday: 'long'});
    // Converting the date e.g. 10/10/21
    const weekdate = date.toLocaleDateString();

    // Show the day and date of the week
    // Then map through the tasks into the TimeTask component as there may be more than one task for that day of the week
    return (
        <>
            {weekday === "Monday" && <PlansText>Weekday Plans</PlansText>}
            {weekday === "Saturday" && <PlansText>Weekend Plans</PlansText>}
            <WeekdayContainer
                className={dateSelected === weekdate && "thirdcolour"}
            >
                <WeekdayText>{weekday}</WeekdayText>
                <WeekdayText>{weekdate}</WeekdayText>
            </WeekdayContainer>
            <>
            {tasks.map(task => (
                <TimeTask task={task} dateSelected={dateSelected} weekdate={weekdate} key={task._id} dayIndex={dayIndex} />
            ))}
            </>           
        </>
    );
};