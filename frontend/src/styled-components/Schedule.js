import styled, { css } from "styled-components/macro";
import { Schedule } from "../pages/Schedule";
import { BasicContainer, BasicLink, BasicButton, BasicP } from "./GlobalStyle";
import "../components/Calendar.css";

export const MainContainer = styled.main`
    padding: 0 20px;
    @media(min-width: 750px){
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
`;

export const SectionContainer = styled.div`
    @media(min-width: 750px){
        width: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        border: 1px solid blue;
    }
`;

export const LeftColumn = styled.div`
    width: 100%;
    @media(min-width: 750px){    
        width: 360px;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: space-evenly;
        margin-right: 30px;
        margin-top: 20px;
        &.column .button{
            display: none;
        }
        &.column .margin{
            margin-top: 0;
        }
    }
`;

export const RightColumn = styled.div`
    width: 100%;
    @media(min-width: 750px) {
        max-width: 45%;
        height: 100%;
        margin-top: 30px;
    }
`;

export const ScheduleText = styled(BasicContainer)`
    font-size: 18px;
    text-align: justify;
    font-family: 'Quicksand', sans-serif;
    margin-top: 10px;
`;

export const WeekText = styled.p`
    width: 70%;
    text-align: center; 
    padding: 12px 0;
    margin: 0 10px 0 0;
    font-size: 19px;
    border-radius: 2px;
    background-color: ${({ theme }) => theme.backgroundColourSeven.background};    
    font-family: 'Quicksand', sans-serif;
`;

export const Link = styled(BasicLink)`
    width: 30%;
`;

export const TodayButton = styled(BasicButton)`
    width: 100%;
    font-size: 19px;
    background-color: ${({ theme }) => theme.backgroundColourThree.background};
    padding: 11px 0;
    &:hover{
        background-color: ${({ theme }) => theme.hoverColourThree.background};
    }
`;

// Styling for calendar
export const CalendarContainer = styled(BasicContainer)`
    background-color: #fff;
    padding: 20px 0;
    border-radius: 5px;
`;

export const CalendarWrapper = styled.div`
    .react-calendar {
        width: 300px;
        min-height: 300px;
        max-height: 343px;
        background: #fff;
        border: none;
        font-family: 'Quicksand', sans-serif;
    }
    .react-calendar button {
        border: 0;
        outline: none;
        border-radius: 50px;
        height: 45px;
        font-family: 'Quicksand', sans-serif;
        font-size: 15px;
    }
    .react-calendar__navigation {
        background-color: ${({ theme }) => theme.backgroundColourEight.background};
        height: 55px;
        width: 100%;
        margin-bottom: 1em;
        padding: 5px;
        font-weight: bold;
    }
    .react-calendar__navigation button {
        min-width: 44px;
        background: none;
    }
    .react-calendar__navigation button:enabled:hover,
    .react-calendar__navigation button:enabled:focus {
        border: 2px solid white;
    }
    .react-calendar__navigation__label__labelText {
        font-family: 'Quicksand', sans-serif;
        font-weight: 700;
        font-size: 17px;
    }
    .react-calendar__navigation__arrow {
        font-family: 'Quicksand', sans-serif;
        font-weight: 700;
        font-size: 17px;
    }
    .react-calendar__month-view__weekdays {
        text-align: center;
        text-transform: uppercase;
        font-family: 'Quicksand', sans-serif;
        font-weight: 600;
    }
    abbr {
        text-decoration: none;
    }
    .react-calendar__month-view__weekdays__weekday {
        padding: 0.2em;
    }
    .react-calendar__month-view__days__day--weekend {
        color: ${({ theme }) => theme.textColourOne.color};
        font-family: 'Quicksand', sans-serif;
    }
    .react-calendar__month-view__days__day--neighboringMonth {
        color: ${({ theme }) => theme.textColourOne.color};
    }
    .react-calendar__tile {
        background: none;
    }
    /*When hovering over date */
    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus {
        background-color: ${({ theme }) => theme.backgroundColourEight.background};
    }
    /*Today's date, colour when not selected */
    .react-calendar__tile--now {
        background: ${({ theme }) => theme.backgroundColourSeven.background};
        color: ${({ theme }) => theme.textColourOne.color};
        font-weight: 600;
    }
    /*Today's date when not selected and hovering over it */
    .react-calendar__tile--now:enabled:hover,
    .react-calendar__tile--now:enabled:focus {
        background-color: ${({ theme }) => theme.backgroundColourThree.background};
    }
    .react-calendar__tile--hasActive {
        background-color: ${({ theme }) => theme.backgroundColourThree.background};
    }
    .react-calendar__tile--now:enabled:hover{
        background-color: ${({ theme }) => theme.backgroundColourThree.background};
    }
    /* Today's date highlighted */
    .react-calendar__tile--active {
        background-color: ${({ theme }) => theme.backgroundColourThree.background};
        color: rgb(0, 0, 0);
        font-weight: 600;
    }
    /* Selected date highlighted */
    .react-calendar__tile--active:enabled:hover,
    .react-calendar__tile--active:enabled:focus {
        background-color: ${({ theme }) => theme.backgroundColourThree.background};
    }
`;

// Styling for add task button component
export const AddTaskContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

export const AddButton = styled(BasicButton)`
    text-align: center;
    font-size: 19px;
    padding: 10px 20px;
    background-color: ${({ theme }) => theme.backgroundColourSeven.background};
    &:hover{
        background-color: ${({ theme }) => theme.hoverColourSeven.background};
    }
`;

export const AddTaskParagraph = styled(BasicP)`
    margin-left: 20px;
    font-family: 'Quicksand', sans-serif;
    text-align: justify;
`;

// Weekly Schedule
export const StatusMessage = styled(BasicP)`
    font-family: 'Quicksand', sans-serif;
    margin-top: 10px;
    font-size: 18px;
`;

export const WeeklyTaskContainer = styled(BasicContainer)`
    flex-direction: column;
`;

// Weekday task
export const PlansText = styled(BasicP)`
    width: 100%;
    background-color: ${({ theme }) => theme.backgroundColourThree.background};
    border-bottom: 3px solid #fff;
    margin: 15px 0 0 0;
    padding: 24px 10px;
    font-size: 19px;
    font-weight: 600;
    font-family: 'Quicksand', sans-serif;
    &:first-child{
        margin: 0;
    }
`;

export const WeekdayContainer = styled(AddTaskContainer)`
    background-color: 
    ${props => props.className === "thirdcolour" ? ({theme}) => theme.backgroundColourThree.background : ({theme}) => theme.backgroundColourEight.background};
    padding: 7px;
    font-size: 17px;
    font-weight: 600;
    font-family: 'Quicksand', sans-serif;
`;

export const WeekdayText = styled(BasicP)`
    font-family: 'Quicksand', sans-serif;
`;

// Time Task
export const TaskLink = styled(BasicLink)`
    width: 100%;
`;

export const TaskContainer = styled(AddTaskContainer)`
  background-color: #ffffff;
  padding: 7px;
  margin-bottom: 10px;
  border-bottom: 3px solid ${({ theme }) => theme.backgroundColourSeven.background};
  font-family: 'Open Sans', sans-serif;
  transition: 0.3s; 
    &:hover {
        border-bottom: 3px solid ${({ theme }) => theme.backgroundColourThree.background};
        transition: 0.3s;
    }
    ${props => props.disabled === "none" && css `
       pointer-events: none;
    `}
`;

export const TaskText = styled(WeekdayText)`
    word-wrap: break-word;
    font-size: 17px;
`;

// AddEditTask & Task summary
export const TaskSection = styled.section`
    width: 100%;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column; 
    @media(min-width: 750px){
        margin-top: 0;
    } 
`;

export const TaskDiv = styled.div`
    margin: 20px 0;
    background-color: ${({ theme }) => theme.backgroundColourSeven.background};
    border-radius: 5px;
    width: 300px;
    height: 100%;
    padding: 20px;
    @media(min-width: 750px){
        width: 360px;
        margin-top: 60px;
    }
`;

export const AddEditTaskLink = styled(BasicLink)`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    text-decoration: none;
`;

export const CloseButton = styled(BasicButton)`
    background-color: ${({ theme }) => theme.backgroundColourThree.background};
    padding: 5px 7px;
    font-size: 15px;
    &:hover{
        background-color: ${({ theme }) => theme.hoverColourThree.background};
    }
`;

export const H2Title = styled.h2`
    font-family: 'Quicksand', sans-serif;
    font-size: 20px;
    font-weight: 600;
    border-bottom: 3px solid #F3FDD8;
    padding-bottom: 10px;
`;

export const AddEditTaskForm = styled.form`
    width: 100%;
    margin-bottom: 20px;
`;

export const AddEditFormInput = styled.input`
    background-color: #fff;
    border: none;
    width: 100%;
    height: 60px;
    margin-bottom: 17px;
    font-family: 'Open Sans', sans-serif;
    font-size: 17px;
    outline: none;
    padding: 0 10px;
    &:focus{
        border: 2px solid ${({ theme }) => theme.borderColourOne.color};
        transition: 0.3s;
    }
`;

export const AddEditFormLabel = styled.label`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    font-weight: 600;
    font-family: 'Quicksand', sans-serif;
    font-size: 17px;
`;

// Date & time picker
export const DateSelect = styled(CalendarWrapper)`
    width: 60%;
    background-color: #fff;

    .react-date-picker {
        display: inline-flex;
        position: relative;
    }
    .react-date-picker,
    .react-date-picker *,
    .react-date-picker *:before,
    .react-date-picker *:after {
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    .react-date-picker--disabled {
        background-color: #f0f0f0;
        color: #6d6d6d;
    }
    /* Wrapper for the whole date picker */
    .react-date-picker__wrapper {
        display: flex;
        flex-grow: 1;
        flex-shrink: 0;
        border: 3px solid #fff;
        padding: 7px 5px;
        color: #313131;
        font-weight: 500;
        font-family: 'Quicksand', sans-serif;
    }
    /* Date picker */
    .react-date-picker__inputGroup {
        min-width: calc((4px * 3) +  0.54em * 8  +  0.217em * 2);
        flex-grow: 1;
        padding: 0 2px;
        box-sizing: content-box;
    }
    .react-date-picker__inputGroup__divider {
        padding: 1px 0;
        white-space: pre;
    }
    .react-date-picker__inputGroup__input {
        min-width: 0.54em;
        height: 100%;
        position: relative;
        padding: 0 1px;
        border: 0;
        background: none;
        font: inherit;
        box-sizing: content-box;
        -moz-appearance: textfield;
    }
    .react-date-picker__inputGroup__input::-webkit-outer-spin-button,
    .react-date-picker__inputGroup__input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    .react-date-picker__inputGroup__input:invalid {
        background: rgba(255, 0, 0, 0.1);
    }
    .react-date-picker__inputGroup__input--hasLeadingZero {
        margin-left: -0.54em;
        padding-left: calc(1px +  0.54em);
    }
    .react-date-picker__inputGroup__fit {
        border: 1px solid blue;
    }
    .react-date-picker__button {
        border: 0;
        background: transparent;
        padding: 4px 6px;
    }
    .react-date-picker__button:enabled {
        cursor: pointer;
    }
    .react-date-picker__button:enabled:hover .react-date-picker__button__icon,
    .react-date-picker__button:enabled:focus .react-date-picker__button__icon {
        stroke: #313131;
    }
    .react-date-picker__button:disabled .react-date-picker__button__icon {
        stroke: #313131;
    }
    /* Date picker svg icons - cross and calendar symbol */
    .react-date-picker__button svg {
        display: inherit;
    }
    .react-date-picker__calendar {
        width: 300px;
        max-width: 100vw;
        position: absolute;
        top: 100%;
        z-index: 1;
        line-height: 1.125em;
        overflow: visible;
    }
    .react-date-picker__calendar--closed {
        display: none;
    }
    .react-date-picker__calendar .react-calendar {
        border-width: thin;
    }    
`;

export const TimeSelect = styled(CalendarWrapper)`
    width: 60%;
    background-color: #fff;

    .react-time-picker {
        display: inline-flex;
        position: relative;
    }
    .react-time-picker,
    .react-time-picker *,
    .react-time-picker *:before,
    .react-time-picker *:after {
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    .react-time-picker--disabled {
        background-color: #f0f0f0;
        color: #6d6d6d;
    }
    .react-time-picker__wrapper {
        display: flex;
        flex-grow: 1;
        flex-shrink: 0;
        border: 3px solid #fff;
        padding: 7px 5px;
        color: #313131;
        font-weight: 500;
        font-family: 'Quicksand', sans-serif;
    }
    .react-time-picker__inputGroup {
        min-width: calc((4px * 3) +  0.54em * 6  +  0.217em * 2);
        flex-grow: 1;
        padding: 0 2px;
        box-sizing: content-box;
    }
    .react-time-picker__inputGroup__divider {
        padding: 1px 0;
        white-space: pre;
    }
    .react-time-picker__inputGroup__input {
        min-width: 0.54em;
        height: 100%;
        position: relative;
        padding: 0 1px;
        border: 0;
        background: none;
        font: inherit;
        box-sizing: content-box;
        -moz-appearance: textfield;
    }
    .react-time-picker__inputGroup__input::-webkit-outer-spin-button,
    .react-time-picker__inputGroup__input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    .react-time-picker__inputGroup__input:invalid {
        background: rgba(199, 245, 177, 0.1);
    }
    .react-time-picker__inputGroup__input--hasLeadingZero {
        margin-left: -0.54em;
        padding-left: calc(1px +  0.54em);
    }
    .react-time-picker__inputGroup__amPm {
    font: inherit;
        -moz-appearance: menulist;
    }
    .react-time-picker__button {
        border: 0;
        background: transparent;
        padding: 4px 6px;
    }
    .react-time-picker__button:enabled {
        cursor: pointer;
    }
    .react-time-picker__button:enabled:hover .react-time-picker__button__icon,
    .react-time-picker__button:enabled:focus .react-time-picker__button__icon {
        stroke: #313131;
        stroke-width: 1;
    }
    .react-time-picker__button:disabled .react-time-picker__button__icon {
        stroke: #6d6d6d;
    }
    .react-time-picker__button svg {
        display: inherit;
        stroke: #313131;
    }
    .react-time-picker__clock {
        width: 200px;
        height: 200px;
        max-width: 100vw;
        padding: 25px;
        background-color: white;
        border: thin solid #a0a096;
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 1;
    }
    .react-time-picker__clock--closed {
        display: none;    
    }
`;

export const AddEditTaskButton = styled(BasicButton)`
    width: 100%;
    margin-top: 20px;
    padding: 10px 0;
    background-color: ${({ theme }) => theme.backgroundColourTwo.background};
    font-size: 16px;
    :hover{
        background-color: ${({ theme }) => theme.backgroundColourThree.background};
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding: 20px 0;
`;


export default Schedule;