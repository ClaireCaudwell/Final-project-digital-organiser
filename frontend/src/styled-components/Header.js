import styled from "styled-components/macro";
import { Header } from "components/Header";
import { BasicButton, BasicH1, BasicLink } from "styled-components/GlobalStyle";

export const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colourOne};
`;

export const TopContainer = styled.div`
  background-color: ${({ theme }) => theme.colourFive};
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
    margin-top: 5px;
    position: relative;
    &.frontpageToggle {
        margin: 15px 10px;
    }
`;

export const Slider = styled.label`
    position: absolute;
    top: 0;
    left: 0;
    width: 66px;
    height: 32px;
    border-radius: 15px;
    background-color: ${({ theme }) => theme.textColourTwo};
    transition: 0.5s;
    cursor: pointer;
    padding-left: 2px;
    &::after {
    content: "";
        display: block;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        margin: 5px;
        background: #fff;
        transition: 0.5s;
    }
`;
export const ToggleInput = styled.input`
    opacity: 0;
    z-index: 1;
    border-radius: 15px;
    width: 66px;
    height: 32px;
    margin: 4px;
    cursor: pointer;
    //if the input is checked make the input and label 
    // change colour and apply the after psuedo styling
    &:checked + ${Slider} {
        background-color: ${({ theme }) => theme.backgroundColourFive};
        &::after {
            display: block;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            margin-left: 38px;
        }
    }
`;

export const ToggleText = styled.p`
font-size: 11px;
font-family: 'Open Sans', sans-serif;
margin: 0;
`;

// const activeClassName = 'nav-item-active';
export const StyledLink = styled(BasicLink)`
    align-self: flex-start;
    margin-top: 3px;
    font-size: 21px;
`;

export const SmallButton = styled(BasicButton)`
    background-color: ${({ theme }) => theme.colourSix};
    padding: 5px 7px;
    font-size: 16px;
    color: ${({ theme }) => theme.textColourOne};
    &:hover{
        background-color: ${({ theme }) => theme.hoverColourSix};
    }
`;

export const WelcomeContainer = styled.div`
    padding: 30px 20px;
    background-color: ${({ theme }) => theme.colourOne};
`;

export const WelcomeText = styled(BasicH1)`
    font-size: 21px;
    font-weight: 400;
    margin: 0;
    text-align: left;
`;

export const NavContainer = styled.nav`
    margin-bottom: 25px;
`;

export const UlContainer = styled.ul`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

export const Link = styled(BasicLink)`
    width: 50%;
    text-align: center;
    padding: 20px;
    font-size: 21px;
    font-family: 'Quicksand', sans-serif;
    background-color: ${({ theme }) => theme.colourTwo};
    &:hover{
        font-weight: 600;
    }
    &.${props=> props.activeClassName} {
        background-color: ${({ theme }) => theme.colourFive};
        font-weight: 600;
    }
    @media(min-width: 640px){
        padding: 25px;
    }
`;

export default Header;