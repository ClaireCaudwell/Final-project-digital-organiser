import React from "react";
import moment from "moment";

import { TaskLink, TaskContainer, TaskText } from "../../styled-components/Schedule";

export const TimeTask = ({ task, dateSelected, weekdate }) => {

    const taskId = task._id;
    // Converting the startdatetime which is a date object, turning it into a string and formatting the time so it's only hours and mins
    const time = moment(task.startdatetime).format("HH:mm");

    return (
        <TaskLink to={`/taskSummary/${taskId}`}>
            <TaskContainer className={dateSelected === weekdate && "thirdcolour"}>
                <TaskText>{task.task}</TaskText>
                <TaskText>{time}</TaskText>
            </TaskContainer>
        </TaskLink>
    );
};