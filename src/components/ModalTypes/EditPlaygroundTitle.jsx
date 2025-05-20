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

const EditPlaygroundTitle = () => {
  const { isOpenModal, closeModal } = useContext(ModalContext)
  const { editPlaygroundTitle, folders } = useContext(PlaygroundContext)

  const { folderId, cardId } = isOpenModal.identifiers
  const [playgroundTitle, setPlaygroundTitle] = useState(
    folders[folderId].playgrounds[cardId].title
  )

  return (
    <>
      <Header>
        <h2>Edit Card Title</h2>
        <CloseButton onClick={closeModal}>
          <IoCloseSharp />
        </CloseButton>
      </Header>

      <Form>
        <input
          type="text"
          value={playgroundTitle}
          onChange={(e) => setPlaygroundTitle(e.target.value)}
        />
        <StyledButton onClick={() => {
          editPlaygroundTitle(folderId, cardId, playgroundTitle)
          closeModal()
        }}>
          Update Title
        </StyledButton>
      </Form>
    </>
  )
}

export default EditPlaygroundTitle
