import React, { useState } from "react";
import { useSelector, useDispatch  } from "react-redux";
import Calendar from "react-calendar";
import moment from "moment";

import "../Calendar.css";

import { getSchedule, weeklySchedule } from "../reducer/weeklySchedule";

export const ScheduleCalendar = () => {
    const dispatch = useDispatch();
    const userId = useSelector((store) => store.user.login.userId);

    // Today's date + date you get when you select date on calendar
    const [ selectedDate, setSelectedDate ] = useState(new Date());
 
    // Setting the selectedDate use state to the date the user has selected
    const onSelectDate = (date) => {
        setSelectedDate(date);
        const chosenDate = date.toISOString();
        dispatch(weeklySchedule.actions.setSelectedDate({ selectedDate: chosenDate }));
        const startDate = moment(date).startOf('isoWeek').toISOString();
        dispatch(weeklySchedule.actions.setStartOfWeek({ startOfWeek: startDate }));     
    };

    // When a week is clicked the week and the date of the monday of that week is sent into the onSelectWeekNumber function
    // This triggers the dispatch to get the schedule for that week from database based on the date for the Monday and the calculated end of week date
    const onSelectWeekNumber =  (week, firstDay) => {
        // week = week number clicked
        // monday = the date that week starts on
        // Convert the dat for the monday to the same date format as in the selectedDate in redux weeklySchedule.js
        const monday = firstDay.toISOString();
        // dispatch is done to get the schedule for the week clicked on
        dispatch(getSchedule(userId, monday));
        // Getting the week clicked on based on the monday date for that week
        const currentWeek = moment(monday).isoWeek();
        // set the week in redux weeklySchedule to the week selected
        dispatch(weeklySchedule.actions.setWeekNumber(currentWeek));
        dispatch(weeklySchedule.actions.setSelectedDate({ selectedDate: monday }));
    };

    return (
        <div className="calendar-div">
            <Calendar
                value={selectedDate}
                onClickDay={onSelectDate}
                showWeekNumbers
                onClickWeekNumber={onSelectWeekNumber}
            />      
        </div>
    )
};