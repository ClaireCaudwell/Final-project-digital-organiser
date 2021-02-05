import styled from "styled-components";

export const MainContainer = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgb(243, 253, 216);
    padding: 60px 20px;
    font-family: 'Quicksand', sans-serif;
`;

// SignUpLogin.js
export const MainTitleContainer = styled.div`
    width: 80%;
    padding: 20px;
`;

export const Title = styled.h1`
    margin: 0 0 10px 0;
    font-size: 28px;
`;

export const SmallText = styled.p`
    margin: 0;
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