import React from "react";
import { useSelector } from "react-redux";

import { WeeklyTask } from "./WeeklyTask";

export const WeeklySchedule = () => {
    // Array of objects from redux store.
    // Order is based on when they were added to the backend, not chronological order
    const weeklyTasks = useSelector((store) => store.weeklySchedule.schedule.weeklyTasks);

    // redux store is read only, so make a copy so that the data can be modified   
    let tasks = weeklyTasks.map(a => Object.assign({}, a));
 
    // In order for the data to be sorted into chronological order, in this case Mon - Sun, need to first convert the startdatetime (string version of new Date object) for each task into new Date object
    for (let i = 0; i < tasks.length; i++) {
        tasks[i].startdatetime = new Date(tasks[i].startdatetime);
    }

    // Then this function sorts each object (a task) based on it's date.
    // Then the array of objects will be in chronological order e.g. at the top all Monday dates and at the bottom all Sunday dates
    const sortedSchedule = tasks.sort((a,b) => {
        if (a.startdatetime > b.startdatetime) {
            return 1;
        } else {
            return -1;
        }
    });

    // Then establish an empty array of arrays.
    // This is where the sorted objects will be pushed to.
    // Each array will represent a day of the week in number format e.g. 0 = Monday, 1 = Tuesday etc
    // And each object (a task) will be pushed into the array that matches it's date e.g. all Monday tasks will be pushed into array 0 (Monday)
    let weeklyTasksArray = [[],[],[],[],[],[],[]];

    // For each object (task) in the array sorted array, use the tasks startdatetime to check it's day of the week using the getDay method.
    // Will return a number e.g. e.g. 0 = Monday, 1=Tuesday etc
    // Normally 0 = Sunday, but because we have -1 in line 42 it will give Monday the number 0 and in the if statement will assign 6 to Sunday
    // Then the sorted array of objects will be pushed into their corresponding arrays based on the number of the week
    // The arrays are also assigned the week number as it's passed in the [] brackets below when pushing the objects into the array
    for ( let i = 0; i < sortedSchedule.length; i++ ) {
        // Checks each array object's date to get the day of the week i.e Monday is 0, Tuesday is 1 etc and Sunday will be 6
        let day = sortedSchedule[i].startdatetime.getDay() -1;
        if(day === -1) {
            day = 6;
        }
        weeklyTasksArray[day].push(sortedSchedule[i]);
    }

    // Example of how the array will look when the sorted items are pushed into their corresponding arrays
    /* weeklyTasksArray = [
        0: [{…}, {…}, {…}, {…}],
        1: [{…}, {…}],
        2: [{…}, {…}],
        3: [{…}, {…}],
        4: [{…}],
        5: [{…}],
        6: [{…}],
    ]; */

    // Then the array is mapped through passing the data into the WeeklyTask component i.e. one task
    // index is the index number for each of the 7 arrays in the weeklyTasksArray
    return (
        <section className="schedule-div weekly-tasks">
            {weeklyTasks.length === 0 && <p className="status-message">No dates in your schedule</p>}
            <>
                {weeklyTasksArray.map((tasks, index) => (
                    <WeeklyTask key={index} tasks={tasks} dayIndex={index} />
                ))}
            </>
        </section>
    );
};