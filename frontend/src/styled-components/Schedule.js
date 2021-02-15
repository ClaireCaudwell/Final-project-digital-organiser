import styled from "styled-components/macro";
import { BasicContainer, BasicLink, BasicButton  } from "./GlobalStyle"; 

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
    font-size: 17px;
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


