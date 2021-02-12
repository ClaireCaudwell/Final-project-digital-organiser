import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import moment from "moment";

import DatePicker from "react-date-picker/dist/entry.nostyle";
import TimePicker from "react-time-picker/dist/entry.nostyle";

import "../DatePicker.css";
import "../TimePicker.css";

import { addTask, task } from "../../reducer/task";
import { weeklySchedule, getSchedule } from "../../reducer/weeklySchedule";

export const AddTask = () => {
    const dispatch = useDispatch();

    const userId = useSelector((store) => store.user.login.userId);
    const statusMessage = useSelector((store => store.task.scheduleTask.statusMessage));
    const selectedDate = useSelector((store) => store.weeklySchedule.schedule.selectedDate);
    
    const [scheduletask, setScheduleTask] = useState("");    
    const [ startDateTime, setStartDateTime ] = useState(new Date(selectedDate));
    const [ taskTime, setTaskTime ] = useState(moment().format("HH:mm"));
    const monday = moment(selectedDate).startOf('isoWeek').toISOString();

    // Before component is mounted set the startDateTime to the selectedDate from redux - helps for the addtask being shown in the screen size larger than 750px to update the date when user clicks on the date in the calendar
    useEffect(() => {
        setStartDateTime(new Date(selectedDate));
        dispatch(getSchedule(userId, monday));
        dispatch(task.actions.setStatusMessage({ statusMessage: null}));
    }, [dispatch, selectedDate, userId, monday]);

    // If user clicks the "x" button then the time chosen is set to null and startTimeDate is set to 00:00
    // Else if user chooses a time this time is set to the date in startDateTime so startdatetime is a combo of the date and time chosen
    // And set chosen time to clock, which will be a string as formatted in the useState
    const timeChosen = (clock) => {
        if(clock === null) {
            startDateTime.setHours(0,0);
        } else {
            startDateTime.setHours(parseInt(clock.split(":")[0]),parseInt(clock.split(":")[1]));
        }
        setTaskTime(clock);
    };

    const handleOnAdd = (event) => {
        event.preventDefault();
        // calling the timechosen function and if user hasn't selected date then it will be current time, formatted string of hours and mins
        timeChosen(taskTime);
        dispatch(addTask(scheduletask, userId, startDateTime));
        dispatch(getSchedule(userId, monday));
        const chosenDate = startDateTime.toISOString();
        dispatch(weeklySchedule.actions.setSelectedDate({ selectedDate: chosenDate }));
        setScheduleTask("");
    };

    const handleClose = () => {
        dispatch(task.actions.clearState());
        dispatch(task.actions.setStatusMessage({ statusMessage: null}));
    };

    return (
        <section className="task-section desktop-view-tasksection">
            <div className="task-container desktop-view-taskcontainer">
                <NavLink to="/schedule" className="close-button-container desktop-view-close-button" activeClassName="not-active">
                    <button type="button" onClick={handleClose}>close</button> 
                </NavLink>
                <h2>Add a task</h2>
                <form onSubmit={handleOnAdd} className="form-container">
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
                        Date:
                        <DatePicker
                            value={startDateTime}
                            onChange={(startDateTime) => setStartDateTime(startDateTime)}
                            required
                            className="picker"
                            clearIcon={null}
                        />
                    </label>
                    <label className="date-container">
                        Time:
                        <TimePicker
                            value={taskTime}
                            onChange={timeChosen}
                            closeClock
                            disableClock
                            required
                            className="picker"
                        />
                    </label>
                    <button className="add-task-button" type="submit">Add task</button>
                </form>
                {statusMessage && <p className="status-message">{`${statusMessage}`}</p>}
            </div>
        </section>
    );
};