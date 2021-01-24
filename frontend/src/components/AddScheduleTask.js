import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import TimePicker from 'react-time-picker/dist/entry.nostyle';

import '../DatePicker.css';
import '../TimePicker.css';
import '../Clock.css';

import { getTask } from "../reducer/task";

export const AddScheduleTask = () => {
    const dispatch = useDispatch();
    const userId = useSelector((store) => store.user.login.userId);
    const statusMessage = useSelector((store => store.task.scheduleTask.statusMessage));

    const [scheduletask, setScheduleTask] = useState("");

    // startDateTime is a combination of the date and time the user selects
    const [ startDateTime, setStartDateTime ] = useState(new Date());
    const [ time, setTime ] = useState(new Date());

    // Dispatching the scheduleTask and startdatetime the user selected to the getTask thunk in task.js redux.
    // startDateTime is called this as it's a combination of th date and time the user selects. The date showing in the database will be based on UTC or GMT timezone and will show an hour behind for Swedish time(the time my computer is set to) e.g. if I select 2021-01-27 10:00 it will show 2021-01-27 09:00 as UTC and GMT in the database. This will be converted to the correct time based on where the user lives when we use the data in the frontend so it'll show the correct time for the schedule task.
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(getTask(scheduletask, userId, startDateTime));
        setScheduleTask("");       
    };

    // startDateTime is a a new Date() based on the date the user selects in the date picker
    // The user then chooses a time in the time picker and the value is assigned to the time useState. This is a string e.g "10:00".
    // onChange calls the timeChosen function and the startDateTime hours and minutes are modified using the setHours method so it will reflect the time the user has selected.
    // This is done by using the parameter clock (the time the user selected e.g. "10:00") and seperating into two numbers using the split (splits the string "10:00" into an array of substrings, and returns the new array["10", "00"], the ":" is identifies where the split should split the numbers) and parseInt converts these two strings into numbers by selecting them based on the index numbers of the elements, 0 is hours and 1 is min.
    const dateChosen = (startDateTime) => {
        setStartDateTime(startDateTime);
    };

    const timeChosen = (clock) => { 
        startDateTime.setHours(parseInt(clock.split(":")[0]),parseInt(clock.split(":")[1]));
        setTime(startDateTime);
        console.log(startDateTime)
    };   

    return (
        <section className="schedule-component-container">
            <Link to="/schedule" className="back-link">
                <div className="close-button-container">
                    <button className="close-button" type="button">x</button> 
                </div>
            </Link>
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
                <div className="date-container">
                    <p>DATE:</p>
                    <DatePicker
                        value={startDateTime}
                        onChange={dateChosen}
                        showWeekNumbers
                    />
                </div>
                <div className="date-container">
                    <p>TIME:</p>
                    <TimePicker
                        value={time}
                        onChange={timeChosen}
                    />
                </div>
                <button className="add-task-button" type="submit" onClick={handleSubmit}>ADD</button>                
            </form>
            {statusMessage && <p>{`${statusMessage}`}</p>}
        </section>
    );
};