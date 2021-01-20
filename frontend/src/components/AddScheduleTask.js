import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { task } from "../reducer/task";

export const AddScheduleTask = () => {
    const dispatch = useDispatch();
    const [scheduletask, setScheduleTask] = useState("");
    const userId = useSelector((store) => store.user.login.userId);
    const statusMessage = useSelector((store => store.task.scheduleTask.statusMessage))

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:8080/users/${userId}/scheduletask`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, scheduletask }),
        })
        .then((res) => {
            if(!res.ok) {
                throw new Error(
                    "Couldn't retrieve task"
                );
            } return res.json();
        })
        .then((json) => {
            dispatch(task.actions.setTaskId({ taskId: json.taskId }));
            dispatch(task.actions.setStatusMessage({ statusMessage: json.statusMessage}));
            dispatch(task.actions.setTask({ task: json.task }));
        })
        .catch((error) => {
            dispatch(task.actions.setErrorMessage({ errorMessage: error.toString()}));
        })
        .finally(() => {
            setScheduleTask("");
        })
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