import React from 'react'
import styled from 'styled-components'
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'

const NavbarContainer = styled.nav`
  height: ${({ isFullScreen }) => (isFullScreen ? '0' : '60px')};
  background-color: #121212;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: height 0.3s ease;
`

const NavbarContent = styled.button`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  padding: 0.25rem 1rem;
  border-radius: 8px;
  transition: background-color 0.25s ease;

  &:hover {
    background-color: #2c2c2c;
  }

  &:focus {
    outline: 2px solid #5c2c90;
    outline-offset: 2px;
  }
`

const Logo = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;
`

const MainHeading = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: #ffffff;
  user-select: none;

  span {
    color: #00f5d4;  /* subtle purple accent */
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`

const Navbar = ({ isFullScreen }) => {
  const navigate = useNavigate()

  return (
    <NavbarContainer isFullScreen={isFullScreen}>
      <NavbarContent onClick={() => navigate('/')}>
        <Logo src={logo} alt="Code Deck Logo" />
        <MainHeading>
          <span>Rushi's</span> Code Editor
        </MainHeading>
      </NavbarContent>
    </NavbarContainer>
  )
}

export default Navbar
