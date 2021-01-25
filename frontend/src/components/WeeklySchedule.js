import React from "react";
import { useSelector } from "react-redux";

import { WeeklyTask } from "./WeeklyTask";

export const WeeklySchedule = () => {

    const scheduleTasks = useSelector((store) => store.weeklySchedule.weeklySchedule.weeklyTasks);    

    return (
        <section className="schedule-component-container">
            {scheduleTasks.map(task => (
                <WeeklyTask key={task._id} task={task}/>
            ))}            
        </section>
    );
};