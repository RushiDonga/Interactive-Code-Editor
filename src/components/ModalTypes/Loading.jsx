import React from 'react'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 150px;
  color: #3b82f6; /* blue */
  font-weight: 600;
  font-size: 1.2rem;
`

const Spinner = styled.div`
  border: 4px solid #cbd5e1; /* light gray */
  border-top: 4px solid #3b82f6; /* blue */
  border-radius: 50%;
  width: 36px;
  height: 36px;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 1rem;
`

const Loading = () => {
  return (
    <LoadingContainer>
      <Spinner />
      Loading...
    </LoadingContainer>
  )
}

export default Loading
