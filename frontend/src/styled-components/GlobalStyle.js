import styled, { createGlobalStyle } from "styled-components/macro";
import { NavLink } from "react-router-dom";

export const GlobalStyle = createGlobalStyle`

  * {
    box-sizing: border-box;
  }

  html { 
    min-height: 100%;
  }

  body {
    margin: 0;
    color: ${({ theme }) => theme.textColourOne};
    background-color: ${({ theme }) => theme.colourFive};    
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

// Basic styles to be used throught components and then built upon
export const BasicH1 = styled.h1`
  font-size: 25px;
  font-family: 'Quicksand', sans-serif;
`;

export const BasicP = styled.p`
  font-size: 18px;
  font-weight: 500;
  font-family: 'Open Sans', sans-serif;
`;

export const BasicButton = styled.button`
  border: none;
  border-radius: 5px;
  font-family: 'Quicksand', sans-serif;
  font-size: 19px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  outline: none;
  text-decoration: none;
  color: ${({ theme }) => theme.textColourOne};
  &:hover{
    transition: 0.3s;
  }
`;

export const Bold = styled.span`
  font-weight: 600;
`;

export const BasicContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 25px 0;
`;

const activeClassName = 'nav-item-active';
export const BasicLink = styled(NavLink).attrs({ activeClassName })`
    color: ${({ theme }) => theme.textColourOne};
    text-decoration: none;
    &.${activeClassName} {
      text-decoration: none;
  }
`;