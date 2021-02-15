import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";

import { userLogin, userSignup } from "reducer/user";
import { BasicH1, BasicButton, BasicP } from "../styled-components/GlobalStyle";

export const SignupLogin = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    
    const userId = useSelector((store) => store.user.login.userId);
    const error = useSelector((store) => store.user.login.errorMessage);
    const accessToken = useSelector((store) => store.user.login.accessToken);
    
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ buttonClick, setButtonClick ] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        if(buttonClick === "signup") {
            dispatch(userSignup(username, password));
        } 
        if(buttonClick === "login") {
            dispatch(userLogin(username, password));
        }
        setUsername("");
        setPassword("");        
    };

    // When access token is present in the user redux store
    // react router pushes to the /schedule path which renders the 
    // schedule component/page
    useEffect(() => {
        if(accessToken) {
            history.push("/schedule");
        }
    }, [accessToken, history]);

    return (
        <>
            <MainContainer>
                <TitleContainer>
                    <MainTitle>Organiser</MainTitle>
                    <SubTitle>Sign up or login to get your organiser</SubTitle>
                </TitleContainer>
                <FormContainer>
                    <Form onSubmit={handleSubmit}>
                        <FormLabel htmlFor="username">Username</FormLabel>
                            <FormInput
                                type="text"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                minLength="3"
                                maxLength="20"
                                required                 
                            />
                        <FormLabel htmlFor="password">Password</FormLabel>
                            <FormInput
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                minLength="5"
                                maxLength="30"
                                required              
                            />
                        <FormButton 
                            className="form-button" 
                            type="submit" 
                            onClick={() => setButtonClick("signup")}
                            >
                                Sign up
                            </FormButton>
                        <FormButton 
                            className="form-button" 
                            type="submit" 
                            onClick={() => setButtonClick("login")}>
                                Login
                        </FormButton> 
                    </Form>
                </FormContainer>
                {userId === null && <Message className="error-message">{error}</Message>}
            </MainContainer>
        </>
    );
};

const MainContainer = styled.main`
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

const TitleContainer = styled.div`
    font-family: 'Quicksand', sans-serif;
    background-color: #F3FDD8;
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

const MainTitle = styled(BasicH1)`
    padding-bottom: 7px;
    border-bottom: 2px solid #c8ec52;
    margin-bottom: 10px;
`;

const SubTitle = styled(BasicP)`
    margin: 0;
`;

// Div
const FormContainer = styled(TitleContainer)`
    padding: 20px 0;
    margin: 0;
    background-color: #C7F5B1;
    border-radius: 5px;
    flex-direction: row;
`;

// Form
const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 20px;  
`;

const FormLabel = styled.label`
    margin-bottom: 10px;
    font-weight: 600;
    font-size: 17px;
    font-family: 'Quicksand', sans-serif;
`;

const FormInput = styled.input`
    margin-bottom: 20px;
    width: 100%;
    height: 40px;
    border: none;
    background-color: transparent;
    border-bottom: 2px solid #F3FDD8;
    transition: 0.3s;
    font-family: 'Open Sans', sans-serif;
    font-size: 17px;

    &:focus {
        border-bottom: 2px solid #6fd845;
        outline: none;
        transition: 0.3s;
    }
`;

const FormButton = styled(BasicButton)`
    width: 100%;
    background-color: #f3fdd8;
    margin-top: 10px;
    margin-right: 20px;
    margin-bottom: 10px;
    padding: 10px;
    &:last-child{
        margin-bottom: 0;
    }
    &:hover{ 
        background-color: #dfff74;
    }
`;

const Message = styled(BasicP)`
    margin-top: 15px;
    text-align: center;
    width: 300px;
    @media(min-width: 1024px) {
        width: 400px;
    }
`;

