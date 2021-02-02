import React from "react";
import { useSelector, useDispatch  } from "react-redux";
import Calendar from "react-calendar";
import moment from "moment";

import "../Calendar.css";

import { getSchedule, weeklySchedule } from "../reducer/weeklySchedule";

export const ScheduleCalendar = () => {
    const dispatch = useDispatch();
    const userId = useSelector((store) => store.user.login.userId);

    // When a week is clicked the week and the date of the monday of that week is sent into the onSelectWeekNumber function
    // This triggers the dispatch to get the schedule for that week from database based on the date for the Monday and the calculated end of week date
    const onSelectWeekNumber =  (week, monday) => {
        // week = week number clicked
        // monday = the date the week starts on
        const currentWeek = moment(monday).isoWeek();
        dispatch(getSchedule(userId, monday));
        dispatch(weeklySchedule.actions.setWeekNumber(currentWeek));
    };

    return (
        <div className="calendar-div">
            <Calendar
                // value={selectedDate}
                // onChange={onSelectDay}
                showWeekNumbers
                onClickWeekNumber={onSelectWeekNumber}
            />      
        </div>
    )
};