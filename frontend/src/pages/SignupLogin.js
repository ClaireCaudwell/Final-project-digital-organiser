import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { userLogin, userSignup } from "reducer/user";
import { Footer } from "../components/Footer";
import {
    ImageWrapper,
    MainContainer,
    SectionWrapper,
    TitleContainer,
    MainTitle,
    SubTitle,
    FormContainer,
    Form,
    FormLabel,
    FormInput,
    FormButton, 
    ErrorMessage
} from "../styled-components/SignupLogin";

import { Loading } from "../components/Loading";

export const SignupLogin = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    
    const userId = useSelector((store) => store.user.login.userId);
    const error = useSelector((store) => store.user.login.errorMessage);
    const accessToken = useSelector((store) => store.user.login.accessToken);
    const isLoading = useSelector((store) => store.user.isLoading);
    
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
        <ImageWrapper>
            <MainContainer>
                {!isLoading ? (
                    <>
                    <SectionWrapper>
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
                                        type="submit" 
                                        onClick={() => setButtonClick("signup")}
                                        >
                                            Sign up
                                        </FormButton>
                                    <FormButton
                                        type="submit" 
                                        onClick={() => setButtonClick("login")}>
                                            Login
                                    </FormButton> 
                                </Form>
                            </FormContainer>
                        {userId === null && <ErrorMessage className="error-message">{error}</ErrorMessage>}
                        <Footer />
                    </SectionWrapper>
                        </>
                ) : (
                    <>
                        <Loading />
                    </>
                )}
            </MainContainer>
        </ImageWrapper>
    );
};

