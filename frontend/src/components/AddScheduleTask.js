import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { getTask } from "../reducer/task";

export const AddScheduleTask = () => {
    const dispatch = useDispatch();
    const [scheduletask, setScheduleTask] = useState("");
    const userId = useSelector((store) => store.user.login.userId);
    const statusMessage = useSelector((store => store.task.scheduleTask.statusMessage));

    //Dispatching the scheduleTask to the getTask thunk in task.js redux
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(getTask(scheduletask, userId));      
        setScheduleTask("");       
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
                <p>TIME FROM</p>
                <p>TIME TO</p>
                <button className="add-task-button" type="submit" onClick={handleSubmit}>ADD</button>                
            </form>
            {statusMessage && <p>{`${statusMessage}`}</p>}
        </section>
    );
};