import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Calendar from "react-calendar";

import "../Calendar.css";

import { weeklySchedule } from "../../reducer/weeklySchedule";

export const ScheduleCalendar = ({ number }) => {
    const dispatch = useDispatch();

    // When user clicks a date in the calendar it get's the selecteDate from redux store, which is today's date, and converts this date from a string to a date object. This then sets the value of the date clicked on the calendar to this date ??
    const selectedDate = new Date(useSelector((store) => store.weeklySchedule.schedule.selectedDate));

    // Getting the date selected by user in calendar, converting to string and dispatching to update the selectedDate in redux
    const onSelectDate = (date) => {
        const chosenDate = date.toISOString();
        dispatch(weeklySchedule.actions.setSelectedDate({ selectedDate: chosenDate }));     
    };    

    return (
        <div className="calendar-div">
            <Calendar
                view={"month"}
                value={selectedDate}
                key={number}
                onClickDay={onSelectDate}
                // prevLabel
                // nextLabel
            />      
        </div>
    )
};