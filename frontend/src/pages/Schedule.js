import React, { useEffect } from "react";
import { useSelector, useDispatch  } from "react-redux";
import Calendar from 'react-calendar';
import moment from 'moment';

import '../Calendar.css';

import { getOrganiser, user } from "../reducer/user";
import { Header } from "../components/Header";
import { AddScheduleTaskButton } from "../components/AddScheduleTaskButton";
import { WeeklySchedule } from "../components/WeeklySchedule";
import { getSchedule, weeklySchedule } from "../reducer/weeklySchedule";


export const Schedule = () => {
    const dispatch = useDispatch();
    const userId = useSelector((store) => store.user.login.userId);
    const accessToken = useSelector((store) => store.user.login.accessToken);

    // Stores the date the user clicks on in the calendar
    // const [ selectedDate, setSelectedDate ] = useState(new Date());
    
    // Gets current week based on today's date
    const currentWeek = moment().isoWeek();
    // Get start of week date based on the today's date. Set it to ISO 8601, 12:00 am e.g. Mon Jan 25 2021 00:00:00 GMT+0100 
    const monday = moment().startOf('isoWeek');    

    // After user signs ups or logs in and before this component is mounted the dispatch to getOrganiser is done in user.js redux.
    // This is so the user can be authenticated and gain access to the schedule.page
    // Error message is set to null in case the login or sign up wasn't successful the first time. This is so it's not still there in redux store user.js when they are authenticated
    useEffect(() => {
        dispatch(getOrganiser(userId, accessToken));
        dispatch(user.actions.setErrorMessage({ errorMessage: null }));
    },[dispatch, userId, accessToken]);


    // After the first useEffect is done and the userId has been stored in the redux store a dispatch is done to get the schedule based on current week
    // Regardless of if they have any tasks or not.
    useEffect(() => {
        if(userId){
            dispatch(weeklySchedule.actions.setErrorMessage({ errorMessage: null}));
            dispatch(getSchedule(userId, monday));
        }
    }, [ dispatch, monday, userId]);

    // When a week is clicked the week and the date of the monday of that week is sent into the onSelectWeekNumber function
    // This triggers the dispatch to get the schedule for that week from database based on the date for the Monday and the calculated end of week date
    const onSelectWeekNumber =  (week, monday) => {
        // week = week number clicked
        // monday = the date the week starts on 
        dispatch(getSchedule(userId, monday));     
    };

    return (
        <>
            <Header />
            <main>
                <div className="schedule-component-container">
                    <h2>Week {currentWeek}</h2>
                </div>
                <p className="schedule-component-container">Please select a week number in the calendar to see your schedule for that week</p>
                <div className="calendar-div">
                    <Calendar
                        // value={selectedDate}
                        // onChange={onDaySelect}
                        showWeekNumbers
                        onClickWeekNumber={onSelectWeekNumber}
                    />
                </div>
                <AddScheduleTaskButton />
                <WeeklySchedule />
            </main>        
        </>
    )
};