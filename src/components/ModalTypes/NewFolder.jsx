import React, { useContext, useState } from 'react'
import { Header, CloseButton } from '../Modal'
import { IoCloseSharp } from 'react-icons/io5'
import { ModalContext } from '../../context/ModalContext'
import { PlaygroundContext } from '../../context/PlaygroundContext'
import styled from 'styled-components'

const ModalBody = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const StyledInput = styled.input`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  width: 100%;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #241f21;
  }
`

const StyledButton = styled.button`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  background-color: #241f21;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: #3a3235;
  }

  &:disabled {
    background-color: #888;
    cursor: not-allowed;
  }
`

const NewFolder = () => {
  const { closeModal } = useContext(ModalContext);
  const { addFolder } = useContext(PlaygroundContext);
  const [folderTitle, setFolderTitle] = useState("");

  const handleSubmit = () => {
    if (folderTitle.trim() !== "") {
      addFolder(folderTitle.trim());
      closeModal();
    }
  }

  return (
    <>
      <Header>
        <h2>Create New Folder</h2>
        <CloseButton onClick={closeModal}>
          <IoCloseSharp />
        </CloseButton>
      </Header>
      <ModalBody>
        <StyledInput
          type="text"
          placeholder="Enter folder name"
          value={folderTitle}
          onChange={(e) => setFolderTitle(e.target.value)}
        />
        <StyledButton onClick={handleSubmit} disabled={!folderTitle.trim()}>
          Create Folder
        </StyledButton>
      </ModalBody>
    </>
  )
}

export default NewFolder
