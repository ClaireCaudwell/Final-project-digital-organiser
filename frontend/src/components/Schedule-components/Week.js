import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

export const Week = () => {
    const selectedDate = useSelector((store) => store.weeklySchedule.schedule.selectedDate);

    // Gets current week based on today's date
    const currentWeek = moment(selectedDate).isoWeek();

    return (
        <>
            <h2 className="bold">Week {currentWeek}</h2>
        </>
    );
};