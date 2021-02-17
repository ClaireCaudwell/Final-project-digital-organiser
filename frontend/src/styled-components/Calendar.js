import styled from "styled-components";
import { BasicContainer } from "./GlobalStyle";

// Styling for react-calendar
export const CalendarContainer = styled(BasicContainer)`
    background-color: #fff;
    padding: 20px 0;
    border-radius: 2px;
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
        background-color: ${props => props.theme.backgroundColourEight.background};
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
        color: ${props => props.theme.textColourOne.color};
        font-family: 'Quicksand', sans-serif;
    }
    .react-calendar__month-view__days__day--neighboringMonth {
        color: ${props => props.theme.textColourOne.color};
    }
    .react-calendar__tile {
        background: none;
    }
    /*When hovering over date */
    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus {
        background-color: ${props => props.theme.backgroundColourEight.background};
    }
    /*Today's date, colour when not selected */
    .react-calendar__tile--now {
        background: ${props => props.theme.backgroundColourSeven.background};
        color: ${props => props.theme.textColourOne.color};
        font-weight: 600;
    }
    /*Today's date when not selected and hovering over it */
    .react-calendar__tile--now:enabled:hover,
    .react-calendar__tile--now:enabled:focus {
        background-color: ${props => props.theme.backgroundColourThree.background};
    }
    .react-calendar__tile--hasActive {
        background-color: ${props => props.theme.backgroundColourThree.background};
    }
    .react-calendar__tile--now:enabled:hover{
        background-color: ${props => props.theme.backgroundColourThree.background};
    }
    /* Today's date highlighted */
    .react-calendar__tile--active {
        background-color: ${props => props.theme.backgroundColourThree.background};
        color: rgb(0, 0, 0);
        font-weight: 600;
    }
    /* Selected date highlighted */
    .react-calendar__tile--active:enabled:hover,
    .react-calendar__tile--active:enabled:focus {
        background-color: ${props => props.theme.backgroundColourThree.background};
    }
`;
