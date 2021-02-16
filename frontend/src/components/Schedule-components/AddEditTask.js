import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import moment from "moment";

import DatePicker from "react-date-picker/dist/entry.nostyle";
import TimePicker from "react-time-picker/dist/entry.nostyle";

import "../DatePicker.css";
import "../TimePicker.css";

import { addTask, editTask, task } from "../../reducer/task";
import { weeklySchedule, getSchedule } from "../../reducer/weeklySchedule";
import { CalendarWrapper, TaskSection, TaskDiv } from "../../styled-components/Schedule";

export const AddEditTask = () => {
    const dispatch = useDispatch();
    const userId = useSelector((store) => store.user.login.userId);
    const taskid = useSelector((store) => store.task.scheduleTask.taskId);
    const statusMessage = useSelector((store => store.task.scheduleTask.statusMessage));
    const selectedDate = useSelector((store) => store.weeklySchedule.schedule.selectedDate);
    const oneTaskDescription = useSelector((store) => store.task.scheduleTask.task);
    const dateandtime = useSelector((store) => store.task.scheduleTask.startdatetime);

    // Helps to implement add or edit task functions and elements
    const isAddMode = !taskid;

    // If add mode is true then each of the useStates below will have the first part of the ternary operator set to it
    const taskDescription = isAddMode ? "" : oneTaskDescription;
    const chosenTime = isAddMode ? {} : dateandtime; 
    const chosenDate = isAddMode ? new Date(selectedDate) : new Date(dateandtime);

    const [ startDateTime, setStartDateTime ] = useState(chosenDate);
    // If no dateandtime from redux then it will be null and current date shown
    const [ taskTime, setTaskTime ] = useState(moment(chosenTime).format("H:mm"));
    const [ scheduletask, setScheduleTask ] = useState(taskDescription);

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

    // When user edits task
    // If user only changes the date, the original time is set to the new date so it's a comination of the date and time
    const dateChosen = (newdate) => {
        newdate.setHours(parseInt(taskTime.split(":")[0]),parseInt(taskTime.split(":")[1]));
        setStartDateTime(newdate);
    };

    // Resetting the form to default states when user adds task
    const resetForm = () => {
        setScheduleTask("");
        setStartDateTime(new Date(selectedDate));
        setTaskTime(moment().format("H:mm"));
    };

    // Function called if user adds a task
    const handleOnAdd = (event) => {
        event.preventDefault();
        // calling the timechosen function and if user hasn't selected date then it will be current time, formatted string of hours and mins
        timeChosen(taskTime);
        dispatch(addTask(scheduletask, userId, startDateTime));
        dispatch(getSchedule(userId, monday));
        const chosenDate = startDateTime.toISOString();
        dispatch(weeklySchedule.actions.setSelectedDate({ selectedDate: chosenDate }));
        resetForm();
    };

    // Function called if user edits the task
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
        dispatch(task.actions.setStatusMessage({ statusMessage: null}));
    };   

    return(
        <>
        <TaskSection>
            <TaskDiv className="desktop-view-taskcontainer">
                <NavLink to="/schedule"
                    className="close-button-container desktop-view-close-button"
                    activeClassName="not-active">
                    <button type="button" onClick={handleClose}>close</button> 
                </NavLink>
                <h2>{isAddMode ? "Add a task" : "Edit your task"}</h2>
                <form onSubmit={isAddMode ? handleOnAdd : handleOnUpdate} className="form-container">
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
                            Date:
                            <DatePicker
                                value={startDateTime}
                                onChange={isAddMode ? (startDateTime) => setStartDateTime(startDateTime) : dateChosen}
                                required
                                className="picker"
                                clearIcon={null}
                            />
                        </label>
                    </CalendarWrapper>
                    <label className="date-container">
                        Time:
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
                    <button className="add-task-button" type="submit">
                        {isAddMode ? "Add task" : "Update task"}
                    </button>
                </form>
                {statusMessage && <p className="status-message">{`${statusMessage}`}</p>}
            </TaskDiv>
        </TaskSection>
        </>
    );
};