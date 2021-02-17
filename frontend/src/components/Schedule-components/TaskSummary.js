import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';

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
    StatusMessage,
    EditDeleteButton,
    Icons,
    DeleteContainer
} from "../../styled-components/Schedule";

import { BasicLink } from "../../styled-components/GlobalStyle";

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
                        <BasicLink to="/edittask">
                            <EditDeleteButton 
                                type="button" 
                                onClick={handleEdit}
                            >
                                <Icons className="material-icons">
                                    mode_edit
                                </Icons>
                                Edit
                            </EditDeleteButton>
                        </BasicLink>
                        <EditDeleteButton
                            type="button" 
                            onClick={handleDelete}
                        >
                            <Icons className="material-icons">
                                delete
                            </Icons>
                            Delete
                        </EditDeleteButton>
                    </ButtonContainer>
                    </>
                ) : (
                    <DeleteContainer>
                        <Icons className="material-icons" largerBin="35px">delete</Icons>
                        <StatusMessage>{statusMessage}</StatusMessage>
                    </DeleteContainer>
                )}
            </TaskDiv>
        </TaskSection>
    );
};