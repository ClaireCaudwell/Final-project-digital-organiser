import styled from "styled-components/macro";
import { Header } from "components/Header";
import { BasicButton, BasicH1, BasicLink } from "styled-components/GlobalStyle";

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
    margin-top: 5px;
    position: relative;
`;

export const Slider = styled.label`
    position: absolute;
    top: 0;
    left: 0;
    width: 66px;
    height: 32px;
    border-radius: 15px;
    background-color: ${({ theme }) => theme.backgroundColourSix.background};
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
    transition: 0.5s;
    margin: 4px;
    cursor: pointer;
    //if the input is checked make the input and label 
    // change colour and apply the after psuedo styling
    &:checked + ${Slider} {
        background-color: ${({ theme }) => theme.backgroundColourSix.background};
        &::after {
            display: block;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            margin-left: 38px;
            transition: 0.5s;
        }
    }
`;

export const ToggleText = styled.p`
font-size: 11px;
font-family: 'Open Sans', sans-serif;
margin-bottom: 0;
`;

// const activeClassName = 'nav-item-active';
export const StyledLink = styled(BasicLink)`
    align-self: flex-start;
    margin-top: 3px;
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

export const Link = styled(BasicLink)`
width: 50%;
text-align: center;
padding: 20px;
font-size: 20px;
font-family: 'Quicksand', sans-serif;
background-color: ${({ theme }) => theme.backgroundColourFour.background};
&:hover{
    font-weight: 600;
}
&.${props=> props.activeClassName} {
    background-color: ${({ theme }) => theme.backgroundColourFive.background};
    font-weight: 600;
}
`;

export default Header;