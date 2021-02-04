import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import moment from "moment";

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
    const selectedDate = useSelector((store) => store.weeklySchedule.schedule.selectedDate);
    
    const [scheduletask, setScheduleTask] = useState("");
    // startDateTime is a combination of the date and time the user selects
    // Will be filled in with the Monday date for that week    
    const [ startDateTime, setStartDateTime ] = useState(new Date(selectedDate));
    // Set to current time
    const [ time, setTime ] = useState(new Date());

    // If user chooses a time then this is set to the hours in the startDateTime is a date object
    const timeChosen = (clock) => { 
        startDateTime.setHours(parseInt(clock.split(":")[0]),parseInt(clock.split(":")[1]));
        setTime(startDateTime);
    };

    // Submits form to the backend via redux store task.js
    // Also sends a new get request to get the weeks worth of schedule tasks again - not sure if this is the best idea?
    const handleOnAdd = (event) => {
        event.preventDefault();
        // calling the timechosen function and if user hasn't selected date then it will be current time and formatted to hours and mins        
        timeChosen(moment(time).format("HH:mm"));
        // dispatch to add task POST endpoint via redux task.js
        dispatch(addTask(scheduletask, userId, startDateTime));
        // converting the combined date and time to a string so it can be dispatched to the redux store to the selectedDate property
        const chosenDate = startDateTime.toISOString();
        dispatch(weeklySchedule.actions.setSelectedDate({ selectedDate: chosenDate }));
        setScheduleTask("");
    };

    const handleClose = () => {
        // Clears the task created in task.js
        dispatch(task.actions.clearState());
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