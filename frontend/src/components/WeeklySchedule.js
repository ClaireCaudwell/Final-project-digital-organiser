import React from "react";
import { useSelector } from "react-redux";

export const WeeklySchedule = () => {

    const task = useSelector((store) => store.task.scheduleTask.task);
    const date = useSelector((store) => store.task.scheduleTask.startdate);
    const time = useSelector((store) => store.task.scheduleTask.starttime);

    return (
        <section className="schedule-component-container">
            <p>{task}</p>
            <p>{date}</p>
            <p>{time}</p>
        </section>
    );
};