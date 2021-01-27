import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import TimePicker from 'react-time-picker/dist/entry.nostyle';

import '../DatePicker.css';
import '../TimePicker.css';
import '../Clock.css';

import { setTask } from "../reducer/task";
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

    // Dispatching the scheduleTask and startdatetime the user selected to the getTask thunk in task.js redux.
    // startDateTime is called this as it's a combination of th date and time the user selects. The date showing in the database will be based on UTC or GMT timezone and will show an hour behind for Swedish time(the time my computer is set to) e.g. if I select 2021-01-27 10:00 it will show 2021-01-27 09:00 as UTC and GMT in the database. This will be converted to the correct time based on where the user lives when we use the data in the frontend so it'll show the correct time for the schedule task.
    // Also when the user adds a new task the current schedule will be updated with this new task as doing the GET request to backend to retrieve the newly added task
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(setTask(scheduletask, userId, startDateTime));
        dispatch(getSchedule(userId, date));
        setScheduleTask("");       
    };

    // startDateTime is a a new Date() based on the date the user selects in the date picker
    // The user then chooses a time in the time picker and the value is assigned to the time useState. This is a string e.g "10:00".
    // onChange calls the timeChosen function and the startDateTime hours and minutes are modified using the setHours method so it will reflect the time the user has selected.
    // This is done by using the parameter clock (the time the user selected e.g. "10:00") and seperating into two numbers using the split (splits the string "10:00" into an array of substrings, and returns the new array["10", "00"], the ":" is identifies where the split should split the numbers) and parseInt converts these two strings into numbers by selecting them based on the index numbers of the elements, 0 is hours and 1 is min.

    const timeChosen = (clock) => { 
        startDateTime.setHours(parseInt(clock.split(":")[0]),parseInt(clock.split(":")[1]));
        setTime(startDateTime);
    };   

    return (
        <section className="schedule-component-container">
            <NavLink to="/schedule" className="back-link">
                <div className="close-button-container">
                    <button className="close-button" type="button">x</button> 
                </div>
            </NavLink>
            <h2>Schedule something!</h2>
            <form>
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
                <button className="add-task-button" type="submit" onClick={handleSubmit}>ADD</button>
            </form>
            {statusMessage && <p>{`${statusMessage}`}</p>}
        </section>
    );
};