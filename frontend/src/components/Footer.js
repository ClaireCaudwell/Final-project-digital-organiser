import React from "react";
import styled from "styled-components";

// import { MainContainer } from "../styled-components/SignupLogin";
import { BasicP } from "../styled-components/GlobalStyle";


export const Footer = () => {
    return(
        <FooterContainer>
            <BasicP>Digital Organiser created by Claire Caudwell for the Technigo Bootcamp final project</BasicP>
        </FooterContainer>
    );
};

const FooterContainer = styled.div`
    padding: 20px;
`;

