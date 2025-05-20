import React from 'react'
import styled from 'styled-components'
import { BiImport } from 'react-icons/bi'

export const Console = styled.div`
  background: #1e1e2f;
  color: #eee;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.6);
  height: 100%;
  max-height: 350px;
`

export const Header = styled.div`
  background: #2a2a40;
  height: 3.5rem;
  box-shadow: inset 0 -2px 4px rgba(255,255,255,0.1);
  padding: 0 1.2rem;
  font-size: 1.15rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  input {
    display: none;
  }
  label, a {
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #8ab4f8;
    cursor: pointer;
    transition: color 0.2s ease;
  }
  label:hover {
    color: #a3c9ff;
  }
`

export const TextArea = styled.textarea`
  flex-grow: 1;
  resize: none;
  border: none;
  outline: none;
  padding: 0.75rem 1rem;
  font-size: 1.1rem;
  font-family: 'Source Code Pro', monospace;
  background: #121224;
  color: #eee;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  min-height: 250px;

  &::placeholder {
    color: #666;
  }
`

const InputConsole = ({ currentInput, setCurrentInput, getFile }) => {
  return (
    <Console>
      <Header>
        Input:
        <label htmlFor="inputfile" title="Import input file">
          <input type="file" accept="." id="inputfile" onChange={(e) => getFile(e, setCurrentInput)} />
          <BiImport size={20} /> Import Input
        </label>
      </Header>
      <TextArea
        placeholder="Type or paste your input here..."
        onChange={(e) => setCurrentInput(e.target.value)}
        value={currentInput}
      />
    </Console>
  )
}

export default InputConsole
