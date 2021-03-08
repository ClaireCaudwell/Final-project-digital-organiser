import styled, { keyframes } from "styled-components/macro";
import { SignupLogin } from "../pages/SignupLogin";
import { BasicH1, BasicP, BasicButton, BasicContainer } from "./GlobalStyle";

// SignupLogin.js page styling
export const ImageWrapper = styled.main`
    background-image: url(${({ theme }) => theme.backgroundImg});
    transition: 0.3s;
    background-size: cover;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    z-index: 1000;
    overflow-y: scroll;
    overflow-x: hidden;
`;

export const MainContainer = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 100vh;
    @media(min-width: 640px){
        margin: 20px 0;
    }
    @media(min-width: 750px){
        margin: 0;
    }
`;

export const SectionWrapper = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
    width: 90%;
    margin: 10px 0;
    background-color: ${({ theme }) => theme.opaqueColour};
    border-radius: 5px;
    @media(min-width: 750px){
        max-width: 70%;
        padding: 70px 0;
    }
    @media(min-width: 1024px){
        margin: 0;
        max-width: 70%;
    }
    @media(min-width: 1200px){
        max-width: 50%;
    }
`;

export const TitleContainer = styled.div`
    font-family: 'Quicksand', sans-serif;
    background-color: ${({ theme }) => theme.colourTwo};
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
    border-radius: 5px 5px 0 0;
    width: 90%;
    @media(min-width: 600px){
        width: 80%;
    }
    @media(min-width: 750px){
        width: 70%;
    }
    @media(min-width: 1024px){
        width: 50%;
    }
`;

export const MainTitle = styled(BasicH1)`
    padding-bottom: 7px;
    border-bottom: 3px solid ${({ theme }) => theme.textColourTwo};
    margin-bottom: 10px;
    margin-top: 0;
`;

export const SubTitle = styled(BasicP)`
    margin: 0;
    font-size: 16px;
`;

export const FormContainer = styled(TitleContainer)`
    padding: 30px 0;
    margin: 0;
    background-color: ${({ theme }) => theme.colourOne};
    border-radius: 0 0 5px 5px;
    flex-direction: row;
    width: 90%;
    @media(min-width: 600px){
        width: 80%;
    }
    @media(min-width: 750px){
        width: 70%;
    }
    @media(min-width: 1024px){
        width: 50%;
    }
`;

export const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 20px;  
`;

export const FormLabel = styled.label`
    margin-bottom: 10px;
    font-weight: 600;
    font-size: 17px;
    font-family: 'Quicksand', sans-serif;
`;

export const FormInput = styled.input`
    margin-bottom: 20px;
    width: 100%;
    height: 40px;
    border: none;
    background-color: ${({ theme }) => theme.colourThree};
    padding: 5px;
    font-family: 'Open Sans', sans-serif;
    font-size: 17px;
    -webkit-border-radius: 0;
    border-radius: 0;
    color: ${({ theme }) => theme.textColourOne};
    &:focus {
        outline: none;
    }
`;

export const FormButton = styled(BasicButton)`
    width: 100%;
    background-color: ${({ theme }) => theme.colourTwo};
    margin-top: 10px;
    margin-right: 20px;
    margin-bottom: 10px;
    padding: 10px;
    font-size: 17px;
    border-radius: 40px;
    outline: none;
    color: ${({ theme }) => theme.textColourOne};
    &:last-child{
        margin-bottom: 0;
    }
    &:hover{ 
        background-color: ${({ theme }) => theme.hoverColourTwo};
}
`;

export const ErrorMessage = styled.div`
    text-align: center;
    width: 100%;
    font-size: 15px;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    background-color: ${({ theme }) => theme.colourEight};
    &:empty{
        display: none;
    }
`;

// Footer styling
export const FooterContainer = styled.div`
    margin: 20px 0 0 0;
    padding: 10px;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colourOne};
    width: 90%;
    @media(min-width: 600px){
        width: 80%;
    }
    @media(min-width: 750px){
        width: 70%;
    }
    @media(min-width: 1024px){
        width: 50%;
    }
`;

export const FooterText = styled(BasicP)`
    font-size: 13px;
    text-align: center;
`;

//Loading component
export const LoaderDiv = styled(BasicContainer)`
    flex-direction: column;
    background-color: ${({ theme }) => theme.opaqueColour};
    border-radius: 5px;
    padding: 20px;
    max-width: 315px;
    color: ${({ theme }) => theme.textColourFour};
`;

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

export const LoaderAnimation = styled.div`
    border: 8px solid ${({ theme }) => theme.colourOne};
    border-top: 8px solid ${({ theme }) => theme.colourSix};
    border-radius: 50%;
    width: 80px;
    height: 80px;
    animation: ${rotate} 2s linear infinite;
`;

export default SignupLogin;