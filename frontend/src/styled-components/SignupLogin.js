import styled from "styled-components/macro";
import { SignupLogin } from "../pages/SignupLogin";
import { BasicH1, BasicP, BasicButton } from "./GlobalStyle";

// SignupLogin.js page styling
export const MainContainer = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 40px 0;
    @media (max-width: 1023px) and (min-width: 840px) {
        margin-top: 90px;
    }
    @media(min-height: 1023px){
        margin: 160px;
    }
    @media(min-width: 1024px) {
        margin-top: 100px;
    }
`;

export const TitleContainer = styled.div`
    font-family: 'Quicksand', sans-serif;
    background-color: ${props => props.theme.backgroundColourOne};
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 35px;
    width: 300px;
    @media(min-width: 1024px) {
        width: 400px;
    }
`;

export const MainTitle = styled(BasicH1)`
    padding-bottom: 7px;
    border-bottom: 2px solid ${props => props.theme.borderColourOne};
    margin-bottom: 10px;
`;

export const SubTitle = styled(BasicP)`
    margin: 0;
`;

export const FormContainer = styled(TitleContainer)`
    padding: 20px 0;
    margin: 0;
    background-color: ${props => props.theme.backgroundColourSix};
    border-radius: 5px;
    flex-direction: row;
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
    background-color: transparent;
    border-bottom: 2px solid ${props => props.theme.backgroundColourOne};
    font-family: 'Open Sans', sans-serif;
    font-size: 17px;
    &:focus {
        border-bottom: 2px solid ${props => props.theme.borderColourOne};
        outline: none;
    }
`;

export const FormButton = styled(BasicButton)`
width: 100%;
background-color: ${props => props.theme.backgroundColourOne};
margin-top: 10px;
margin-right: 20px;
margin-bottom: 10px;
padding: 10px;
font-size: 17px;
outline: none;
&:last-child{
    margin-bottom: 0;
}
&:hover{ 
    background-color: ${props => props.theme.backgroundColourThree};
}
`;

export const ErrorMessage = styled(BasicP)`
margin-top: 15px;
text-align: center;
width: 300px;
@media(min-width: 1024px) {
    width: 400px;
}
`;

export default SignupLogin;