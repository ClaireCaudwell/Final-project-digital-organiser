import styled, { css } from "styled-components/macro";
import { Schedule } from "../pages/Schedule";
import { BasicContainer, BasicLink, BasicButton, BasicP } from "./GlobalStyle";
import { FormLabel, FormInput, FormButton } from "./SignupLogin";

// Schedule.js page styling
export const MainContainer = styled.main`
    min-height: 100%;
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

// Week text & today button
export const WeekText = styled.p`
    width: 70%;
    text-align: center; 
    padding: 12px 0;
    margin: 0 10px 0 0;
    font-size: 19px;
    font-weight: 600;
    border-radius: 2px;
    background-color: ${props => props.theme.backgroundColourSix};    
    font-family: 'Quicksand', sans-serif;
    border: ${({ theme }) => theme.border};
`;

export const Link = styled(BasicLink)`
    width: 30%;
`;

export const TodayButton = styled(BasicButton)`
    width: 100%;
    font-size: 19px;
    color: ${props => props.theme.textColourOne};
    background-color: ${props => props.theme.backgroundColourThree};
    padding: 12px 0;
    &:hover{
        background-color: ${props => props.theme.hoverColourThree};
    }
`;

// Add task button component
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
    color: ${({ theme }) => theme.textColour};
    background-color: ${props => props.theme.backgroundColourSix};
    &:hover{
        background-color: ${props => props.theme.hoverColourSeven};
    }
`;


export const AddTaskParagraph = styled(BasicP)`
    margin-left: 20px;
    font-family: 'Quicksand', sans-serif;
    text-align: justify;
`;

// Weekly Schedule list component
export const StatusMessage = styled(BasicP)`
    font-family: 'Quicksand', sans-serif;
    margin-top: 10px;
    font-size: 18px;
`;

export const WeeklyTaskContainer = styled(BasicContainer)`
    flex-direction: column;
`;

// Weekday task component
export const PlansText = styled(BasicP)`
    width: 100%;
    background-color: ${props => props.theme.backgroundColourThree};
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
    ${props => props.className === "thirdcolour" ? props.theme.backgroundColourThree : props.theme.backgroundColourEight};
    padding: 7px;
    font-size: 17px;
    font-weight: 600;
    font-family: 'Quicksand', sans-serif;
`;

export const WeekdayText = styled(BasicP)`
    font-family: 'Quicksand', sans-serif;
    font-weight: 600;
`;

// Time Task component
export const TaskLink = styled(BasicLink)`
    width: 100%;
`;

export const TaskContainer = styled(AddTaskContainer)`
  background-color: #ffffff;
  padding: 7px;
  margin-bottom: 10px;
  border-bottom: 3px solid ${props => props.theme.backgroundColourSix};
  font-family: 'Open Sans', sans-serif;
  transition: 0.3s; 
    &:hover {
        border-bottom: 3px solid ${props => props.theme.backgroundColourThree};
        transition: 0.3s;
    }
    ${props => props.disabled === "none" && css `
       pointer-events: none;
    `}
`;

export const TaskText = styled(WeekdayText)`
    word-wrap: break-word;
    font-size: 17px;
    font-weight: 500;
`;

// AddEditTask & Task summary components
export const TaskSection = styled.section`
    width: 100%;
    padding: 0 20px;
    margin-top: 30px;
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
    background-color: ${props => props.theme.backgroundColourSix};    
    border: ${({ theme }) => theme.border};
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
    background-color: ${props => props.theme.backgroundColourThree};
    color: ${props => props.theme.textColourOne};
    padding: 5px 7px;
    font-size: 15px;
    &:hover{
        background-color: ${props => props.theme.hoverColourThree};
    }
`;

export const H2Title = styled.h2`
    font-family: 'Quicksand', sans-serif;
    font-size: 19px;
    font-weight: 600;
    border-bottom: 3px solid ${props => props.theme.backgroundColourOne};
    padding-bottom: 10px;
`;

export const AddEditTaskForm = styled.form`
    width: 100%;
    margin-bottom: 20px;
`;

export const AddEditFormInput = styled(FormInput)`
    background-color: #fff;
    height: 60px;
    margin-bottom: 17px;
    padding: 0 10px;
    border-bottom: none;
    &:focus{
        border: 2px solid ${props => props.theme.borderColourOne};
    }
`;

export const AddEditFormLabel = styled(FormLabel)`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const AddEditTaskButton = styled(FormButton)`
    width: 100%;
    margin: 20px 0 0 0;
    color: ${({ theme }) => theme.textColourOne};
    background-color: ${props => props.theme.backgroundColourOne};
    &:hover{
        background-color: ${props => props.theme.backgroundColourThree};
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding: 20px 0;
`;

export const EditDeleteButton = styled(BasicButton)`
    background-color: ${props => props.theme.backgroundColourOne};
    border-radius: 50%;
    height: 65px;
    width: 65px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    &:hover{
        background-color: ${props => props.theme.backgroundColourThree};
    }
`;

export const Icons = styled.span`
    &.material-icons{
        margin-bottom: 5px;
        font-size: ${props => props.largerBin || "16px"};
        color: ${({ theme }) => theme.textColourOne};
    }
`;

export const DeleteContainer = styled(BasicContainer)`
    flex-direction: column;
    margin: 20px 0;
    padding: 20px;
    text-align: center;
    border-radius: 5px;
    height: 70%;
`;

export default Schedule;