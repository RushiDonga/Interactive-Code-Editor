import React, { useContext } from 'react'
import styled from 'styled-components'
import { IoTrashOutline } from 'react-icons/io5'
import { BiEditAlt } from 'react-icons/bi'
import { FcOpenedFolder } from 'react-icons/fc'
import logo from '../../assets/logo-small.png'
import { ModalContext } from '../../context/ModalContext'
import { PlaygroundContext } from '../../context/PlaygroundContext'
import { useNavigate } from 'react-router-dom'

const StyledRightComponent = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  width: 60%;
  padding: 2rem;
  background-color: #1a1a1a;
  color: #f0f0f0;
  overflow-y: auto;

  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    padding: 1rem;
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  border-bottom: 1px solid #333;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
`

const Heading = styled.h3`
  font-size: ${props => props.size === 'small' ? "1.25rem" : "1.75rem"};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    font-weight: 700;
    color: #00f5d4;
  }
`

const AddButton = styled.div`
  background: linear-gradient(135deg, #00f5d4, #00c9ff);
  padding: 0.5rem 1.2rem;
  border-radius: 30px;
  color: #121212;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 245, 212, 0.3);
  transition: all 0.2s ease;

  span {
    font-size: 1.3rem;
    font-weight: 700;
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    box-shadow: 0 0 16px rgba(0, 245, 212, 0.6);
  }
`

const FolderCard = styled.div`
  margin-bottom: 2rem;
`

const FolderIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.25rem;

  svg {
    transition: transform 0.2s;
    &:hover {
      transform: scale(1.2);
      cursor: pointer;
      color: #00f5d4;
    }
  }
`

const PlayGroundCards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 428px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 0 12px rgba(0, 245, 212, 0.3);
    cursor: pointer;
  }
`

const CardContainer = styled.div`
  display: flex;
  align-items: center;
`

const CardContent = styled.div`
  p {
    margin: 0;
    font-size: 0.95rem;
    color: #ddd;

    &:first-child {
      font-weight: 600;
      margin-bottom: 0.2rem;
    }

    &:last-child {
      font-size: 0.85rem;
      color: #aaa;
    }
  }
`

const Logo = styled.img`
  width: 60px;
  margin-right: 1rem;

  @media (max-width: 425px) {
    width: 45px;
  }
`

const RightComponent = () => {
  const navigate = useNavigate()
  const { openModal } = useContext(ModalContext)
  const { folders, deleteFolder, deleteCard } = useContext(PlaygroundContext)

  return (
    <StyledRightComponent>
      <Header>
        <Heading size="large">My <span>Playground</span></Heading>
        <AddButton onClick={() => openModal({
          show: true,
          modalType: 1,
          identifiers: { folderId: "", cardId: "" }
        })}><span>+</span> New Folder</AddButton>
      </Header>

      {
        Object.entries(folders).map(([folderId, folder]) => (
          <FolderCard key={folderId}>
            <Header>
              <Heading size="small"><FcOpenedFolder /> {folder.title}</Heading>
              <FolderIcons>
                <IoTrashOutline onClick={() => deleteFolder(folderId)} />
                <BiEditAlt onClick={() => openModal({
                  show: true,
                  modalType: 4,
                  identifiers: { folderId, cardId: "" }
                })} />
                <AddButton onClick={() => openModal({
                  show: true,
                  modalType: 2,
                  identifiers: { folderId, cardId: "" }
                })}><span>+</span> New Playground</AddButton>
              </FolderIcons>
            </Header>

            <PlayGroundCards>
              {
                Object.entries(folder.playgrounds).map(([playgroundId, playground]) => (
                  <Card key={playgroundId} onClick={() => navigate(`/playground/${folderId}/${playgroundId}`)}>
                    <CardContainer>
                      <Logo src={logo} alt="logo" />
                      <CardContent>
                        <p>{playground.title}</p>
                        <p>Language: {playground.language}</p>
                      </CardContent>
                    </CardContainer>
                    <FolderIcons onClick={e => e.stopPropagation()}>
                      <IoTrashOutline onClick={() => deleteCard(folderId, playgroundId)} />
                      <BiEditAlt onClick={() => openModal({
                        show: true,
                        modalType: 5,
                        identifiers: { folderId, cardId: playgroundId }
                      })} />
                    </FolderIcons>
                  </Card>
                ))
              }
            </PlayGroundCards>
          </FolderCard>
        ))
      }
    </StyledRightComponent>
  )
}

export default RightComponent
