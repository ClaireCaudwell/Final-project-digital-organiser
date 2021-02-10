import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Calendar from "react-calendar";

import "../Calendar.css";

import { weeklySchedule } from "../../reducer/weeklySchedule";

export const ScheduleCalendar = ({ randomNumber }) => {
    const dispatch = useDispatch();

    // The calendar value is set to the selectedDate in redux
    // Converted to date object as the calendar value needs date object, in redux it's a string
    // When user chooses date in calendar and goes to another component the date will be stored in redux
    // So when the user goes back to the schedule.js the calendar will show the last date the user clicked on
    const selectedDate = new Date(useSelector((store) => store.weeklySchedule.schedule.selectedDate));

    // Getting the date selected by user in calendar, converting to string and dispatching to update the selectedDate in redux
    const onSelectDate = (date) => {
        const chosenDate = date.toISOString();
        dispatch(weeklySchedule.actions.setSelectedDate({ selectedDate: chosenDate }));     
    };    

    return (
        <section className="section-container white">
            <Calendar
                view={"month"}
                value={selectedDate}
                key={randomNumber}
                onClickDay={onSelectDate}
            />      
        </section>
    )
};