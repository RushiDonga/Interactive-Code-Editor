import React, { useContext, useState } from 'react'
import { Header, CloseButton } from '../Modal'
import { IoCloseSharp } from 'react-icons/io5'
import { ModalContext } from '../../context/ModalContext'
import { PlaygroundContext } from '../../context/PlaygroundContext'
import Select from 'react-select'
import styled from 'styled-components'

// Styled Container
const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.2rem;

  label {
    font-weight: 600;
    color: #333;
  }

  input {
    height: 2.5rem;
    padding: 0 0.75rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`

const StyledButton = styled.button`
  background: #3b82f6;
  border-radius: 24px;
  border: none;
  padding: 0.55rem 1.2rem;
  font-weight: 700;
  color: white;
  cursor: pointer;
  min-width: 100px;
  transition: border 0.3s ease;

  &:hover {
    border: 1px solid white;
  }
`

const customSelectStyles = {
  control: (base) => ({
    ...base,
    borderRadius: '8px',
    height: '2.5rem',
    borderColor: '#ccc',
    fontSize: '1rem',
  }),
  option: (base, { isFocused }) => ({
    ...base,
    backgroundColor: isFocused ? '#3b82f6' : 'white',
    color: isFocused ? 'white' : 'black',
  }),
}

const NewPlaygroundAndFolder = () => {
  const { closeModal } = useContext(ModalContext)
  const { addPlaygroundAndFolder } = useContext(PlaygroundContext)

  const languageOptions = [
    { value: 'cpp', label: 'C++' },
    { value: 'java', label: 'Java' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
  ]

  const [playgroundName, setPlaygroundName] = useState('')
  const [folderName, setFolderName] = useState('')
  const [language, setLanguage] = useState(languageOptions[0])

  const handleLanguageChange = (selectedOption) => {
    setLanguage(selectedOption)
  }

  return (
    <>
      <Header>
        <h2>Create New Playground & Folder</h2>
        <CloseButton onClick={closeModal}>
          <IoCloseSharp />
        </CloseButton>
      </Header>

      <Form>
        <label>Enter Folder Name</label>
        <input type='text' onChange={(e) => setFolderName(e.target.value)} />

        <label>Enter Playground Name</label>
        <input type='text' onChange={(e) => setPlaygroundName(e.target.value)} />

        <label>Select Language</label>
        <Select
          options={languageOptions}
          value={language}
          onChange={handleLanguageChange}
          styles={customSelectStyles}
        />

        <StyledButton onClick={() => {
          addPlaygroundAndFolder(folderName, playgroundName, language.value)
          closeModal()
        }}>
          Create Playground
        </StyledButton>
      </Form>
    </>
  )
}

export default NewPlaygroundAndFolder
