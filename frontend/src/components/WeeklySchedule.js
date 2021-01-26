import React from "react";
import { useSelector } from "react-redux";

// import { weeklySchedule } from "reducer/weeklySchedule";
import { WeeklyTask } from "./WeeklyTask";

export const WeeklySchedule = () => {
    // Array of objects from redux
    let weeklyTasks = useSelector((store) => store.weeklySchedule.schedule.weeklyTasks);

    // redux store is read only, make a copy so that we can modify the data    
    weeklyTasks = weeklyTasks.map(a => Object.assign({}, a));
    
    // Converting the string startdatetime for each task to a date so it can be sorted below
    // In order to do this without line 12 would I have to dispatch the new date back to the redux store as I can't modify the initial state
    // Do I even need redux store for the array of users tasks being accessed from backend?
    for (let i = 0; i < weeklyTasks.length; i++) {
        weeklyTasks[i].startdatetime = new Date(weeklyTasks[i].startdatetime);
    }

    // Function to sort each array object based on it's date
    const sortedSchedule = weeklyTasks.sort( (a,b) => {
        if (a.startdatetime > b.startdatetime) {
            return 1;
        } else {
            return -1;
        }
    });
                
    // For each object check it's day of the week e.g. 0, 1, 2, 3 etc
    // Based on that number push it to the empty array and give that array the day's number
    let weeklyTasksArray = [[],[],[],[],[],[],[]];
    for ( let i = 0; i < sortedSchedule.length; i++ ) {
        // Checks each array object's date to get the day of the week i.e Monday is 0, Tuesday is 1 etc and Sunday will be 6
        let day = sortedSchedule[i].startdatetime.getDay() -1;
        if(day === -1) {
            day = 6;
        }
        weeklyTasksArray[day].push(sortedSchedule[i]);
    }

    // Component that maps through the weeklyTasks (an array of an array that's for each day of the week) from the redux store
    // index is the index number for each of the 7 arrays in the redux store, which is a day of the week

    return (
        <section className="schedule-component-container">
            {weeklyTasksArray.map((tasks, index) => (
                <WeeklyTask key={index} tasks={tasks} dayIndex={index} />
            ))}         
        </section>
    );
};