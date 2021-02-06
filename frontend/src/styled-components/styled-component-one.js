import styled from "styled-components";

// SignUpLogin.js
export const MainTitleContainer = styled.header`
    padding: 20px;
    /* height: 200px; */
    margin-bottom: 20px;
    background-color: rgb(243, 253, 216);
    font-family: 'Quicksand', sans-serif;
`;

export const MainContainer = styled.main`
    font-family: 'Quicksand', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid blue;
`;

export const FrontpageDiv = styled.div`
    border: 1px solid green;
`;

export const Title = styled.h1`
    margin: 0 0 10px 0;
    padding-bottom: 7px;
    width: 120px;
    font-size: 25px;
    border-bottom: 2px solid black;
`;

export const SmallText = styled.p`
    margin: 0;
    font-size: 15px;
`;

export const SignupLoginForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 80%;
    padding: 20px;
    border-radius: 5px;
    margin-top: 10px;
`;