import React, { useContext, useState } from 'react';
import { Header, CloseButton } from '../Modal';
import { IoCloseSharp } from 'react-icons/io5';
import { ModalContext } from '../../context/ModalContext';
import { PlaygroundContext } from '../../context/PlaygroundContext';
import Select from 'react-select';
import styled from 'styled-components';

const FormContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const StyledInput = styled.input`
  height: 2.5rem;
  padding: 0 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  background: #f9f9f9;
  color: #333;
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const StyledSelectWrapper = styled.div`
  .react-select__control {
    border-radius: 8px;
    border-color: #ccc;
    background: #f9f9f9;
  }
  .react-select__menu {
    background: #fff;
  }
`;

const CreateButton = styled.button`
  background: #3b82f6;
  border-radius: 24px;
  border: none;
  padding: 0.55rem 1.2rem;
  font-weight: 700;
  color: white;
  cursor: pointer;
  min-width: 150px;
  transition: all 0.3s ease;
  align-self: flex-start;

  &:hover {
    border: 1px solid white;
  }
`;

const NewPlayground = () => {
  const { isOpenModal, closeModal } = useContext(ModalContext);
  const { addPlayground } = useContext(PlaygroundContext);

  const languageOptions = [
    { value: 'cpp', label: 'C++' },
    { value: 'java', label: 'Java' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
  ];

  const { folderId } = isOpenModal.identifiers;
  const [cardTitle, setCardTitle] = useState('');
  const [language, setLanguage] = useState(languageOptions[0]);

  const handleLanguageChange = (selectedOption) => {
    setLanguage(selectedOption);
  };

  return (
    <>
      <Header>
        <h2>Create New Playground</h2>
        <CloseButton onClick={closeModal}>
          <IoCloseSharp />
        </CloseButton>
      </Header>
      <FormContainer>
        <StyledInput
          type="text"
          placeholder="Enter playground name"
          value={cardTitle}
          onChange={(e) => setCardTitle(e.target.value)}
        />
        <StyledSelectWrapper>
          <Select
            classNamePrefix="react-select"
            options={languageOptions}
            value={language}
            onChange={handleLanguageChange}
          />
        </StyledSelectWrapper>
        <CreateButton
          onClick={() => {
            addPlayground(folderId, cardTitle, language.value);
            closeModal();
          }}
        >
          Create Playground
        </CreateButton>
      </FormContainer>
    </>
  );
};

export default NewPlayground;
