import { Header } from "components/Header-components/Header";
import { BasicButton, BasicH1 } from "styled-components/GlobalStyle";
import styled from "styled-components/macro";
import { NavLink } from 'react-router-dom';

export const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.backgroundColourOne.background};
`;

export const TopContainer = styled.div`
  background-color: ${({ theme }) => theme.backgroundColourTwo.background};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px; 
`;

export const ToggleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`;

export const ToggleText = styled.p`
font-size: 11px;
font-family: 'Open Sans', sans-serif;
margin-bottom: 0;
`;

const activeClassName = 'nav-item-active';
export const StyledLink = styled(NavLink).attrs({ activeClassName })`
    align-self: flex-start;
    margin-top: 3px;
    color: #313131;
    text-decoration: none;
    &.${activeClassName} {
        text-decoration: none;
  }
`;

export const SmallButton = styled(BasicButton)`
    background-color: ${({ theme }) => theme.backgroundColourThree.background};
    padding: 5px 7px;
    &:hover{
        background-color: ${({ theme }) => theme.hoverColourThree.background};
    }
`;

export const WelcomeContainer = styled.div`
padding: 0 20px;
margin: 30px 0;
`;

export const WelcomeText = styled(BasicH1)`
    font-size: 21px;
    font-weight: 400;
    margin: 0;
    text-align: left;
`;

export const NavContainer = styled.nav`
    margin-top: 20px;
`;

export const UlContainer = styled.ul`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    list-style-type: none;
    margin-bottom: 10px;
    padding: 0;
`;

export const Link = styled(StyledLink)`
width: 50%;
text-align: center;
padding: 20px;
font-size: 20px;
font-family: 'Quicksand', sans-serif;
background-color: ${({ theme }) => theme.backgroundColourFour.background};
&:hover{
    font-weight: 600;
}
&.${activeClassName} {
    background-color: ${({ theme }) => theme.backgroundColourFive.background};
    font-weight: 600;
}
`;

export default Header;