import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import moment from "moment";

import DatePicker from "react-date-picker/dist/entry.nostyle";
import TimePicker from "react-time-picker/dist/entry.nostyle";

import "../DatePicker.css";
import "../TimePicker.css";

import { editTask, task } from "../../reducer/task";
import { weeklySchedule } from "reducer/weeklySchedule";
import { CalendarWrapper, TaskSection, TaskDiv } from "../../styled-components/Schedule";

export const EditTask = () => {
    const dispatch = useDispatch();

    const userId = useSelector((store) => store.user.login.userId);
    const taskid = useSelector((store) => store.task.scheduleTask.taskId);
    const statusMessage = useSelector((store => store.task.scheduleTask.statusMessage));
    const dateandtime = useSelector((store) => store.task.scheduleTask.startdatetime);
    const taskDescription = useSelector((store) => store.task.scheduleTask.task);
    
    // All three states set to the data from the object for the task in the weeklyTasks in redux store
    const [ scheduletask, setScheduleTask ] = useState(taskDescription); 
    const [ startDateTime, setStartDateTime ] = useState(new Date(dateandtime));
    const [ taskTime, setTaskTime ] = useState(moment(dateandtime).format("H:mm"));

    // If user only changes the date, the original time is set to the new date so it's a comination of the date and time
    const dateChosen = (newdate) => {
        newdate.setHours(parseInt(taskTime.split(":")[0]),parseInt(taskTime.split(":")[1]));
        setStartDateTime(newdate);
    };

    // If user decides to click the "x" on the react time picker then the time is set to null
    // This sets the time to null in useState
    // Else the date the user has chosen will be updated with the new time chosen
    // And the taskTime will be set to the time that the user has chosen and converted in the state to a string of hour and min e.g 12:00
    const timeChosen = (clock) => { 
        if(clock === null) {
            startDateTime.setHours(0,0);
        } else {
            startDateTime.setHours(parseInt(clock.split(":")[0]),parseInt(clock.split(":")[1]));
        }
        // The use this new Date and set it to the time
        setTaskTime(clock);
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
        <TaskSection>
            <TaskDiv className="desktop-view-taskcontainer">
                <NavLink to="/schedule"
                    className="close-button-container">
                    <button type="button" onClick={handleClose}>close</button> 
                </NavLink>
                <h2>Edit your task</h2>
                <form onSubmit={handleOnUpdate} className="form-container">
                    <input
                        type="text"
                        className="input-box"
                        value={scheduletask}
                        onChange={(event) => setScheduleTask(event.target.value)}
                        required
                        minLength="3"
                        maxLength="30" 
                    />
                    <CalendarWrapper>
                        <label className="date-container">
                            DATE:
                            <DatePicker
                                value={startDateTime}
                                onChange={dateChosen}
                                required
                                className="picker"
                                clearIcon={null}
                            />
                        </label>
                    </CalendarWrapper>
                    <label className="date-container">
                        TIME:
                        <TimePicker
                            value={taskTime}
                            onChange={timeChosen}
                            closeClock
                            disableClock
                            required
                            className="picker"
                            format="H:mm"
                        />
                    </label>
                    <button className="add-task-button" type="submit" onClick={handleOnUpdate}>Update task</button>
                </form>
                {statusMessage && <p className="status-message">{`${statusMessage}`}</p>}
            </TaskDiv>
        </TaskSection>
    )
}