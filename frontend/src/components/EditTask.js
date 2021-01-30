import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import TimePicker from 'react-time-picker/dist/entry.nostyle';

import '../DatePicker.css';
import '../TimePicker.css';
import '../Clock.css';

import { editTask, task } from "../reducer/task";
import { getSchedule } from "../reducer/weeklySchedule";

export const EditTask = () => {
    const dispatch = useDispatch();

    const userId = useSelector((store) => store.user.login.userId);
    const statusMessage = useSelector((store => store.task.scheduleTask.statusMessage));
    const startdatetime = useSelector((store) => store.task.scheduleTask.startdatetime);
    const taskDescription = useSelector((store) => store.task.scheduleTask.task);
    const taskid = useSelector((store) => store.task.scheduleTask.taskId);
    const date = useSelector((store) => store.weeklySchedule.schedule.firstDayOfWeek);
    
    const [scheduletask, setScheduleTask] = useState(taskDescription);
    // startDateTime is a combination of the date and time the user selects
    const [ startDateTime, setStartDateTime ] = useState(new Date(startdatetime));
    const [ time, setTime ] = useState(new Date(startdatetime));
    const [ clearMessage, setClearMesssage ] = useState(false);

    const timeChosen = (clock) => { 
        startDateTime.setHours(parseInt(clock.split(":")[0]),parseInt(clock.split(":")[1]));
        setTime(startDateTime);
    };

    const handleOnUpdate = (event) => {
        event.preventDefault();
        dispatch(editTask(scheduletask, userId, startDateTime, taskid));
        dispatch(getSchedule(userId, date));
        setClearMesssage(true);
    };

    const handleClearMessage = () => {
        if(clearMessage) {
            dispatch(task.actions.setStatusMessage({ statusMessage: null })); 
        }
        dispatch(task.actions.clearState());
    };

    return (
        <section className="schedule-component-container">
            <NavLink to="/schedule" className="back-link">
                <div className="close-button-container" onClick={handleClearMessage}>
                    <button className="close-button" type="button">x</button> 
                </div>
            </NavLink>
            <h2>Edit your task</h2>
            <form onSubmit={handleOnUpdate}>
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
                <button className="add-task-button" type="submit" onClick={handleOnUpdate}>UPDATE TASK</button>
            </form>
            {statusMessage && <p>{`${statusMessage}`}</p>}
        </section>
    )
}