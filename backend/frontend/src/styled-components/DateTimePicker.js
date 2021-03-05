import styled from "styled-components";
import { CalendarWrapper } from "./Calendar";

// Styling for react Date & time picker
export const DateSelect = styled(CalendarWrapper)`
    width: 60%;
    background-color: #fff;

    .react-date-picker {
        display: inline-flex;
        position: relative;
        display: flex;
        justify-content: space-between;
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
        display: flex;
        justify-content: space-between;
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