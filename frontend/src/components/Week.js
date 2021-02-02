import React from "react";
import { useSelector } from "react-redux";

export const Week = () => {
    const week = useSelector((store) => store.weeklySchedule.schedule.week);

    return (
        <div className="schedule-component-container">
            <h2>Week {week}</h2>
        </div>
    );
};