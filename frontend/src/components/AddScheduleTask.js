import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

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
            <h4>Schedule something!</h4>
            <form>
                <input
                    value={scheduletask}
                    onChange={(event) => setScheduleTask(event.target.value)}
                    required
                    minLength="2"
                    maxLength="20" 
                />
                <button type="submit" onClick={handleSubmit}>SUBMIT</button>                
            </form>
            {statusMessage && <p>{`${statusMessage}`}</p>}
        </section>
    );
};