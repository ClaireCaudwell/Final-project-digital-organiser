import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import DatePicker from "react-date-picker/dist/entry.nostyle";
import TimePicker from "react-time-picker/dist/entry.nostyle";

import "../DatePicker.css";
import "../TimePicker.css";
import "../Clock.css";

import { addTask, task } from "../reducer/task";
import { weeklySchedule } from "../reducer/weeklySchedule";

export const AddTask = () => {
    const dispatch = useDispatch();

    const userId = useSelector((store) => store.user.login.userId);
    const statusMessage = useSelector((store => store.task.scheduleTask.statusMessage));
    // First day of week date which comes from the fetch GET response to get the weekly schedule
    const week = useSelector((store) => store.weeklySchedule.schedule.week);
    const selectedDate = useSelector((store) => store.weeklySchedule.schedule.selectedDate);
    
    const [scheduletask, setScheduleTask] = useState("");
    // startDateTime is a combination of the date and time the user selects
    // Will be filled in with the Monday date for that week    
    const [ startDateTime, setStartDateTime ] = useState(new Date(selectedDate));
    // Set to current time
    const [ time, setTime ] = useState(new Date());    

    // startDateTime is a a new Date() based on the date the user selects in the date picker
    // The user then chooses a time in the time picker and the value is assigned to the time useState. This is a string e.g "10:00".
    // onChange calls the timeChosen function and the startDateTime hours and minutes are modified using the setHours method so it will reflect the time the user has selected.
    // This is done by using the parameter clock (the time the user selected e.g. "10:00") and seperating into two numbers using the split (splits the string "10:00" into an array of substrings, and returns the new array["10", "00"], the ":" is identifies where the split should split the numbers) and parseInt converts these two strings into numbers by selecting them based on the index numbers of the elements, 0 is hours and 1 is min.
    const timeChosen = (clock) => { 
        startDateTime.setHours(parseInt(clock.split(":")[0]),parseInt(clock.split(":")[1]));
        setTime(startDateTime);
    };

    // Submits form to the backend via redux store task.js
    // Also sends a new get request to get the weeks worth of schedule tasks again - not sure if this is the best idea?
    const handleOnAdd = (event) => {
        event.preventDefault();
        // dispatch to add task POST endpoint via redux task.js
        dispatch(addTask(scheduletask, userId, startDateTime));
        // converting the combined date and time to a string so it can be dispatched to the redux store
        const chosenDate = startDateTime.toISOString();
        // dispatch the combined date and time the user has chosen to the redux store to set it to the selectedDate
        // This is then used in the dispatch in Schedule.js to get the schedule for the week the user has added a task to
        dispatch(weeklySchedule.actions.setSelectedDate({ selectedDate: chosenDate }));
        setScheduleTask("");
    };

    const handleClose = () => {
        // Clears the task created in task.js
        dispatch(task.actions.clearState());
        // Set's week number to the week clicked on
        dispatch(weeklySchedule.actions.setWeekNumber(week));
        // clears status message so it isn't shown if the user opens the add task component
        dispatch(task.actions.setStatusMessage({ statusMessage: null}));
    };

    return (
        <section className="schedule-component-container">
            <NavLink to="/schedule" className="back-link">
                <div className="close-button-container">
                    <button className="close-button" type="button" onClick={handleClose}>close</button> 
                </div>
            </NavLink>
            <h2>Schedule something!</h2>
            <form onSubmit={handleOnAdd}>
                <input
                    type="text"
                    className="input-box"
                    value={scheduletask}
                    onChange={(event) => setScheduleTask(event.target.value)}
                    required
                    minLength="3"
                    maxLength="30" 
                />
                <label className="date-container">
                    DATE:
                    <DatePicker
                        value={startDateTime}
                        onChange={(startDateTime) => setStartDateTime(startDateTime)}
                        showWeekNumbers
                        required
                    />
                </label>
                <label className="date-container">
                    TIME:
                    <TimePicker
                        value={time}
                        onChange={timeChosen}
                        closeClock
                        disableClock
                        required
                    />
                </label>
                <button className="add-task-button" type="submit">ADD TASK</button>
            </form>
            {statusMessage && <p>{`${statusMessage}`}</p>}
        </section>
    );
};