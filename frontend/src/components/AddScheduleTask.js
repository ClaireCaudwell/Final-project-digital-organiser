import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import TimePicker from 'react-time-picker/dist/entry.nostyle';

import '../DatePicker.css';
import '../TimePicker.css';
import '../Clock.css';

import { setTask, task } from "../reducer/task";
import { getSchedule } from "../reducer/weeklySchedule";

export const AddScheduleTask = () => {
    const dispatch = useDispatch();
    const userId = useSelector((store) => store.user.login.userId);
    const statusMessage = useSelector((store => store.task.scheduleTask.statusMessage));
    const date = useSelector((store) => store.weeklySchedule.schedule.firstDayOfWeek);
    
    const [scheduletask, setScheduleTask] = useState("");
    // startDateTime is a combination of the date and time the user selects
    const [ startDateTime, setStartDateTime ] = useState(new Date());
    const [ time, setTime ] = useState(new Date());

    // Before component is mounted clear any Task's retrieved from redux task.js
    // This is because redux is being used to store the data sent back from creating and getting a task in the backend
    useEffect(() => {
        if(statusMessage === "Task retrieved"){
            dispatch(task.actions.setStatusMessage({ statusMessage: null }));
        }
    });

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
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(setTask(scheduletask, userId, startDateTime));
        dispatch(getSchedule(userId, date));
        setScheduleTask("");
    };

    return (
        <section className="schedule-component-container">
            <NavLink to="/schedule" className="back-link">
                <div className="close-button-container">
                    <button className="close-button" type="button">x</button> 
                </div>
            </NavLink>
            <h2>Schedule something!</h2>
            <form onSubmit={handleSubmit}>
                <input
                    className="input-box"
                    value={scheduletask}
                    onChange={(event) => setScheduleTask(event.target.value)}
                    required
                    minLength="2"
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