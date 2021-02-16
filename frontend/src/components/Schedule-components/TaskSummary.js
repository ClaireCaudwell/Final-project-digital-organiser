import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink } from 'react-router-dom';

import moment from 'moment';

import { getTask, deleteTask, task } from "../../reducer/task";
import { weeklySchedule } from "../../reducer/weeklySchedule";
import { 
    TaskSection,
    TaskDiv,
    AddEditTaskLink,
    CloseButton,
    H2Title,
    WeekdayContainer,
    TaskContainer,
    TaskText,
    ButtonContainer,
    StatusMessage




} from "../../styled-components/Schedule";

export const TaskSummary = () => {
    const { taskId } = useParams();
    const dispatch = useDispatch();
    const userId = useSelector((store) => store.user.login.userId);
    const taskDescription = useSelector((store) => store.task.scheduleTask.task);
    const statusMessage = useSelector((store => store.task.scheduleTask.statusMessage));
    const startdatetime = useSelector((store) => store.task.scheduleTask.startdatetime);

    const [ taskDeleted, setTaskDeleted ] = useState(false);

    // Before component renders dispatch is done to get the task from the database
    useEffect(() => {
        if(!taskDeleted){
            dispatch(getTask(taskId, userId));
            dispatch(weeklySchedule.actions.setSelectedDate({ selectedDate: startdatetime }))
        }
    }, [taskId, userId, dispatch, taskDeleted, startdatetime]);

    // Converting the of the week e.g. Monday
    const weekday = moment(startdatetime).format("dddd");
    // Converting the date e.g. 10/10/21
    const date = new Date(startdatetime).toLocaleDateString();  

    // Converting the time
    const time = moment(startdatetime).format("HH:mm");

    const handleDelete = () => {
        dispatch(deleteTask(userId, taskId));
        dispatch(task.actions.setStatusMessage({ statusMessage: null}));
        setTaskDeleted(true);
    };

    const handleClose = () => {
        dispatch(task.actions.clearState());
        dispatch(task.actions.setStatusMessage({ statusMessage: null}))
    };

    const handleEdit = () => {
        dispatch(task.actions.setStatusMessage({ statusMessage: null })); 
    };

    return (
        <TaskSection>
            <TaskDiv>
                <AddEditTaskLink to="/schedule">
                    < CloseButton 
                        type="button" 
                        onClick={handleClose}>
                            Close
                    </ CloseButton> 
                </AddEditTaskLink>
                {!taskDeleted ? (
                    <>
                    <H2Title>Task summary</H2Title>
                    <WeekdayContainer>
                        <TaskText>{weekday}</TaskText>
                        <TaskText>{date}</TaskText>
                    </WeekdayContainer>
                    <TaskContainer disabled="none">
                        <TaskText>{taskDescription}</TaskText>
                        <TaskText>{time}</TaskText>
                    </TaskContainer>
                    <ButtonContainer>
                        <NavLink to="/edittask" className="no-link">
                            <button 
                                type="button" 
                                onClick={handleEdit}
                            >
                                <span className="material-icons">
                                    mode_edit
                                </span>
                                Edit
                            </button>
                        </NavLink>
                        <button
                            type="button" 
                            onClick={handleDelete}
                        >
                            <span className="material-icons">
                                delete
                            </span>
                            Delete
                        </button>
                    </ButtonContainer>
                    </>
                ) : (
                    <div className="delete-container">
                        <span className="material-icons larger-bin">delete</span>
                        <StatusMessage>{statusMessage}</StatusMessage>
                    </div>
                )}
            </TaskDiv>
        </TaskSection>
    );
};