import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, NavLink } from 'react-router-dom';


export const TaskSummary = () => {
    const { taskId } = useParams();
    const userId = useSelector((store) => store.user.login.userId);

    const [ taskDetails, setTaskDetails ] = useState([]);

    const getTask = (taskId, userId) => {
        fetch(`http://localhost:8080/users/${userId}/scheduletask/${taskId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json"},
        })
        .then((res) => {
            return res.json();
        })
            .then((res) => {
                setTaskDetails(res);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    useEffect(() => {
        getTask(taskId, userId);
    }, [taskId, userId]);

    // Getting first day of week from redux weeklySchedule.js 
    // const firstDayOfWeek = useSelector((store) => store.weeklySchedule.weeklySchedule.firstDayOfWeek);

    // Taking the firstDayOfWeek from redux store which is a string
    // Converting it to a date using the new date object so we can use date methods on it
    // Then getting the day of the month for that date using getDate method
    // Then using the setDate method to set the day of the date, taking the first day of the week and incremeting this based on the dayIndex number (array of days of the week) by 1.
    // The date is converted to a string in English which will be e.g. 01/01/21 etc
    // Then the date is covnverted to the day of the week e.g. "Monday"
    // const date = new Date(firstDayOfWeek);
    // const firstDayOfWeekDateNumber = date.getDate();
    // date.setDate(firstDayOfWeekDateNumber+i);
    // const weekDate = date.toLocaleDateString();
    // const weekday = date.toLocaleString([], {weekday: 'long'});

    // Convert startdatetime which is a string to a date
    // Then using toLocaleTimeString to target the date's time and format it into a string showing the hour and mins 
    // const time = new Date(dateandtime);
    // const taskTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const handleDelete = (event) => {
        event.preventDefault();
        // dispatch()
    };

    return (
        <section className="schedule-component-container">
            <NavLink to="/schedule" className="back-link">
                <div className="close-button-container">
                    <button className="close-button" type="button">x</button> 
                </div>
            </NavLink>
            <h2 className="summary-text">Schedule summary</h2>
            <div className="week-day-container no-background">
                <p>Monday</p>
                <p>01/01/21</p>
            </div>
            <p>Walk the dog</p>
            <p className="heavy-text">Time 14:00</p>
            <div className="button-container">
                <button type="button">EDIT</button>
                <button type="submit" onClick={handleDelete}>DELETE</button>
            </div>         
        </section>
    );
};