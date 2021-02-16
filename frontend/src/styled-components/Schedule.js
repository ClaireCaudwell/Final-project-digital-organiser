import styled from "styled-components/macro";
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
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        align-items: space-evenly;
        margin-right: 30px;
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
    border-bottom: 3px solid ${({ theme}) => theme.backgroundColourThree.background};
    transition: 0.3s;
  }
`;

export const TaskText = styled(WeekdayText)`
    word-wrap: break-word;
    font-size: 17px;
`;




export default Schedule;