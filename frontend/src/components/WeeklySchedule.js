import React from "react";
import { useSelector } from "react-redux";

import { WeeklyTask } from "./WeeklyTask";

export const WeeklySchedule = () => {

    const scheduleTasks = useSelector((store) => store.weeklySchedule.weeklySchedule.weeklyTasks);

    // Component that maps through the weeklyTasks (an array of an array that's for each day of the week) from the redux store
    // index is the index number for each of the 7 arrays in the redux store, which is a day of the week

    return (
        <section className="schedule-component-container">
            {scheduleTasks.map((tasks, index) => (
                <WeeklyTask key={index} tasks={tasks} dayIndex={index} />
            ))}            
        </section>
    );
};