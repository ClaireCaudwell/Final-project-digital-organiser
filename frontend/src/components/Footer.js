import React from "react";
import styled from "styled-components/macro";

import { BasicP } from "../styled-components/GlobalStyle";

export const Footer = () => {
    return(
        <FooterContainer>
            <FooterText>Digital Organiser built by Claire Caudwell for the Technigo Bootcamp final project 2021</FooterText>
        </FooterContainer>
    );
};

const FooterContainer = styled.div`
    margin: 0 auto;
    padding: 0 10px;
    width: ${props => props.widthSize || "100%"};
        /* @media(min-width: 1024px){
            width: 400px;
        } */
`;

const FooterText = styled(BasicP)`
    font-size: 13px;
    text-align: center;
`;

