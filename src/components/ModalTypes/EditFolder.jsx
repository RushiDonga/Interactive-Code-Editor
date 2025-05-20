import React, { useContext, useState } from 'react'
import { Header, CloseButton } from '../Modal'
import { IoCloseSharp } from 'react-icons/io5'
import { ModalContext } from '../../context/ModalContext'
import { PlaygroundContext } from '../../context/PlaygroundContext'
import styled from 'styled-components'

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.2rem;

  input {
    height: 2.5rem;
    padding: 0 0.75rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
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

const EditFolder = () => {
  const { closeModal, isOpenModal } = useContext(ModalContext)
  const { editFolderTitle, folders } = useContext(PlaygroundContext)

  const folderId = isOpenModal.identifiers.folderId
  const [folderTitle, setFolderTitle] = useState(folders[folderId].title)

  return (
    <>
      <Header>
        <h2>Edit Folder Title</h2>
        <CloseButton onClick={closeModal}>
          <IoCloseSharp />
        </CloseButton>
      </Header>

      <Form>
        <input
          type="text"
          value={folderTitle}
          onChange={(e) => setFolderTitle(e.target.value)}
        />
        <StyledButton onClick={() => {
          editFolderTitle(folderId, folderTitle)
          closeModal()
        }}>
          Update Title
        </StyledButton>
      </Form>
    </>
  )
}

export default EditFolder
