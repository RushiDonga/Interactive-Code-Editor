import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const Container = styled.div`
  height: 100vh;
  background: #121212;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.6s ease-out;

  h1 {
    font-size: 6rem;
    margin-bottom: 1rem;
    color: #ff6b6b;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: #ccc;
  }

  span {
    color: #ff6b6b;
    font-weight: bold;
  }
`

const Error404 = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/')
    }, 3000)
    return () => clearTimeout(timeout)
  }, [navigate])

  return (
    <Container>
      <h1>404</h1>
      <p>No page found — <span>Redirecting to home</span> in 3 seconds...</p>
    </Container>
  )
}

export default Error404
