import React, { useContext } from 'react'
import styled, { keyframes } from 'styled-components'
import logo from '../../assets/logo.png'
import { ModalContext } from '../../context/ModalContext'

// Animated background gradient
const gradient = keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
`

const StyledLeftComponent = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 40%;
    height: 100vh;
    background: linear-gradient(135deg, #121212, #1f1f1f, #121212);
    background-size: 400% 400%;
    animation: ${gradient} 25s ease infinite;

    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px){
        position: relative;
        width: 100%;
    }
`

const CardContainer = styled.div`
    background: rgba(255, 255, 255, 0.05);
    padding: 3rem 2.5rem;
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    text-align: center;
    width: 90%;
    max-width: 360px;
    transition: all 0.3s ease;
`

const Logo = styled.img`
    width: 150px;
    margin-bottom: 2rem;
    filter: drop-shadow(0 0 10px rgba(255,255,255,0.1));
`

const MainHeading = styled.h1`
    font-size: 2.2rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 0.5rem;
    letter-spacing: 0.8px;

    span {
        color: #00f5d4;
    }
`

const SubHeading = styled.p`
    font-size: 1.1rem;
    color: #cfcfcf;
    margin-bottom: 2rem;
    opacity: 0.8;
    letter-spacing: 0.3px;
`

const AddNewButton = styled.button`
    background: linear-gradient(135deg, #00f5d4, #00c9ff);
    color: #121212;
    padding: 0.75rem 2rem;
    border: none;
    border-radius: 30px;
    font-size: 1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 0 15px rgba(0, 245, 212, 0.3);
    transition: all 0.25s ease-in-out;

    span {
        font-size: 1.5rem;
        font-weight: 700;
    }

    &:hover {
        cursor: pointer;
        transform: scale(1.05);
        box-shadow: 0 0 25px rgba(0, 245, 212, 0.6);
    }
`

const LeftComponent = () => {
    const { openModal } = useContext(ModalContext);

    return (
        <StyledLeftComponent>
            <CardContainer>
                <Logo src={logo} alt="Logo" />
                <MainHeading><span>Rushi's</span> Code Editor</MainHeading>
                <SubHeading>Code. Compile. Debug.</SubHeading>
                <AddNewButton onClick={() => openModal({
                    show: true,
                    modalType: 3,
                    identifiers: {
                        folderId: "",
                        cardId: "",
                    }
                })}>
                    <span>+</span> Create Playground
                </AddNewButton>
            </CardContainer>
        </StyledLeftComponent>
    )
}

export default LeftComponent
