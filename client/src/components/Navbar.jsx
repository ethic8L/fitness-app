import React from 'react'
import styled from 'styled-components'
import LogoImg from "../utils/Images/Logo.png";
import { Link as LinkR } from "react-router-dom";

const Nav = styled.div`
    background-color: ${({theme}) => theme.bg};
    height: 80px;
    display: flex;
    alighn-items: center;
    justify-content: center;
    font-size: 1rem;
    position: sticky;
    top: 0;
    z-index: 10;
    color: white;
    border-bottom: 1px solid ${({theme}) => theme.text_secondary + 20};
`;

const NavContainer = styled.div`
    width: 100%;
    max-width: 1400px;
    padding: 0 24px;
    dispay: flex;
    gap: 14px;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
`;

const NavLogo = styled(LinkR)`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 0 6px;
    font-weight: 600;
    font-size: 18px;
    text-decoration: none;
    color: ${({theme}) => theme.black};
`;

const Logo = styled.img`
    height: 42px;
`;

const Navbar = () => {
  return (
    <Nav>
        <NavContainer>
            <NavLogo to="/">
                <Logo src={LogoImg}/>
                Fittrack
            </NavLogo>
        </NavContainer>
    </Nav>
  )
}

export default Navbar