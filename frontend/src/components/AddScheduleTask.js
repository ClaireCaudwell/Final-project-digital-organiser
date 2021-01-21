import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import DatePicker from 'react-date-picker/dist/entry.nostyle';

import '../DatePicker.css';
import { getTask } from "../reducer/task";

export const AddScheduleTask = () => {
    const dispatch = useDispatch();
    const userId = useSelector((store) => store.user.login.userId);
    const statusMessage = useSelector((store => store.task.scheduleTask.statusMessage));

    const [scheduletask, setScheduleTask] = useState("");

    const [ date, setDate ] = useState(new Date());

    //Dispatching the scheduleTask to the getTask thunk in task.js redux
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(getTask(scheduletask, userId, date));      
        setScheduleTask("");       
    };

    const onChange = (date) => {
        setDate(date);
    };

    console.log(date);

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
                <DatePicker
                    value={date}
                    onChange={onChange}
                    showWeekNumbers
                    // onClickWeekNumber
                />
                <p>TIME FROM</p>
                <p>TIME TO</p>
                <button className="add-task-button" type="submit" onClick={handleSubmit}>ADD</button>                
            </form>
            {statusMessage && <p>{`${statusMessage}`}</p>}
        </section>
    );
};