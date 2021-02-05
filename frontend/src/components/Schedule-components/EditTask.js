import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import TimePicker from "react-time-picker/dist/entry.nostyle";

import "../DatePicker.css";
import "../TimePicker.css";

import { editTask, task } from "../../reducer/task";
import { weeklySchedule } from "reducer/weeklySchedule";

export const EditTask = () => {
    const dispatch = useDispatch();

    const userId = useSelector((store) => store.user.login.userId);
    const statusMessage = useSelector((store => store.task.scheduleTask.statusMessage));
    const dateandtime = useSelector((store) => store.task.scheduleTask.startdatetime);
    const taskDescription = useSelector((store) => store.task.scheduleTask.task);
    const taskid = useSelector((store) => store.task.scheduleTask.taskId);
    
    const [scheduletask, setScheduleTask] = useState(taskDescription);
    // startDateTime is a combination of the date and time the user selects
    const [ startDateTime, setStartDateTime ] = useState(new Date(dateandtime));
    const [ time, setTime ] = useState(new Date(dateandtime));

    const dateChosen = (newdate) => {
        // If user only changes the date, the original time is set to the setStartDateTime with the new date
        newdate.setHours(time.getHours(), time.getMinutes());
        setStartDateTime(newdate);
    };

    const timeChosen = (clock) => { 
        // On the startDateTime use the time inputted by the user and set it to the startdatetime
        startDateTime.setHours(parseInt(clock.split(":")[0]),parseInt(clock.split(":")[1]));
        // The use this new Date and set it to the time
        setTime(startDateTime);
    };

    const handleOnUpdate = (event) => {
        event.preventDefault();
        // dispatch to PATCH endpoint to update the task in the backend
        dispatch(editTask(scheduletask, userId, startDateTime, taskid));
        // converting the date and time the user has chosen into a string
        const dateandtime = startDateTime.toISOString();
        // dispatching the selected date to the selectedDate in redux store
        dispatch(weeklySchedule.actions.setSelectedDate({ selectedDate: dateandtime }));
    };

    const handleClose = () => {
        dispatch(task.actions.clearState());
        dispatch(task.actions.setStatusMessage({ statusMessage: null}))
    };

    return (
        <section className="schedule-component-container">
            <NavLink to="/schedule" className="back-link">
                <div className="close-button-container" onClick={handleClose}>
                    <button className="close-button" type="button">close</button> 
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
                        onChange={dateChosen}
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