import React, { useContext, useState } from 'react'
import CodeEditor from './CodeEditor'
import styled from 'styled-components'
import { BiEditAlt, BiImport, BiExport, BiFullscreen } from 'react-icons/bi'
import { ModalContext } from '../../context/ModalContext'
import Select from 'react-select';
import { languageMap } from '../../context/PlaygroundContext'

const StyledEditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: ${({ isFullScreen }) => (isFullScreen ? '100vh' : 'calc(100vh - 4.5rem)')};
  background: #1e1e2f;
  color: #ddd;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`

const UpperToolBar = styled.div`
  background: #2c2c44;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1rem;
  gap: 1rem;
  flex-wrap: wrap;
  border-bottom: 1px solid #3a3a5e;
  box-shadow: 0 1px 5px rgba(0,0,0,0.3);

  @media (max-width: 540px){
    flex-direction: column;
    align-items: flex-start;
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 540px){
    width: 100%;
    justify-content: space-between;
  }
`

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 600;
  font-size: 1.25rem;
  color: #f0f0f0;

  svg {
    cursor: pointer;
    color: #8ab4f8;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: #aecbfa;
    }
  }
`

const Button = styled.button`
  background: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  font-weight: 600;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: #2563eb;
  }

  @media (max-width: 540px){
    width: 100%;
  }
`

const SelectBars = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 200px;

  & > div {
    width: 120px;
  }

  @media (max-width: 540px){
    width: 100%;
    & > div {
      width: 100%;
    }
  }
`

const CodeEditorContainer = styled.div`
  flex-grow: 1;
  height: calc(100% - 4.4rem);

  & > div {
    height: 100%;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.7);
  }
`

const LowerToolBar = styled.div`
  background: #2c2c44;
  padding: 0.6rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  border-top: 1px solid #3a3a5e;

  button, label, a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #cbd5e1;
    font-size: 1.1rem;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: #3b82f6;
    }
  }

  input {
    display: none;
  }

  button {
    background: transparent;
    border: none;
    padding: 0;
  }

  @media (max-width: 540px){
    flex-direction: column;
    align-items: stretch;
    
    button, label, a {
      justify-content: center;
      width: 100%;
      font-size: 1.25rem;
      padding: 0.4rem 0;
    }
  }
`

const SaveAndRunButton = styled.button`
  background: #0097d7;
  color: white;
  border: none;
  border-radius: 32px;
  padding: 0.7rem 1.4rem;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: border 0.3s ease;

  &:hover {
    color: white;
  }
`

const EditorContainer = ({
  title,
  currentLanguage,
  setCurrentLanguage,
  currentCode,
  setCurrentCode,
  folderId,
  playgroundId,
  saveCode,
  runCode,
  getFile,
  isFullScreen,
  setIsFullScreen
}) => {
  const { openModal } = useContext(ModalContext)

  const themeOptions = [
    { value: 'githubDark', label: 'GitHub Dark' },
    { value: 'githubLight', label: 'GitHub Light' },
    { value: 'bespin', label: 'Bespin' },
    { value: 'duotoneDark', label: 'Duotone Dark' },
    { value: 'duotoneLight', label: 'Duotone Light' },
    { value: 'dracula', label: 'Dracula' },
    { value: 'xcodeDark', label: 'Xcode Dark' },
    { value: 'xcodeLight', label: 'Xcode Light' },
    { value: 'vscodeDark', label: 'VSCode Dark' },
    { value: 'vscodeLight', label: 'VSCode Light' },
    { value: 'okaidia', label: 'Okaidia' },
  ]

  const languageOptions = [
    { value: 'cpp', label: 'C++' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'java', label: 'Java' },
    { value: 'python', label: 'Python' },
  ]

  const [currentTheme, setCurrentTheme] = useState({ value: 'githubDark', label: 'GitHub Dark' })

  const [language, setLanguage] = useState(() => {
    const found = languageOptions.find(opt => opt.value === currentLanguage)
    return found || languageOptions[0]
  })

  const handleThemeChange = (selectedOption) => {
    setCurrentTheme(selectedOption)
  }

  const handleLanguageChange = (selectedOption) => {
    setLanguage(selectedOption)
    setCurrentLanguage(selectedOption.value)
    setCurrentCode(languageMap[selectedOption.value].defaultCode)
  }

  return (
    <StyledEditorContainer isFullScreen={isFullScreen}>
      {!isFullScreen && (
        <UpperToolBar>
          <Header>
            <Title>
              <h3>{title}</h3>
              <BiEditAlt
                onClick={() =>
                  openModal({
                    show: true,
                    modalType: 5,
                    identifiers: {
                      folderId,
                      cardId: playgroundId,
                    },
                  })
                }
              />
            </Title>
            <Button onClick={saveCode}>Save Code</Button>
          </Header>

          <SelectBars>
            <Select
              options={languageOptions}
              value={language}
              onChange={handleLanguageChange}
              isSearchable={false}
              styles={{
                control: (base) => ({
                  ...base,
                  background: '#3a3a5e',
                  border: 'none',
                  color: '#eee',
                }),
                singleValue: (base) => ({
                  ...base,
                  color: '#eee',
                }),
                menu: (base) => ({
                  ...base,
                  background: '#2c2c44',
                  color: '#eee',
                }),
              }}
            />
            <Select
              options={themeOptions}
              value={currentTheme}
              onChange={handleThemeChange}
              isSearchable={false}
              styles={{
                control: (base) => ({
                  ...base,
                  background: '#3a3a5e',
                  border: 'none',
                  color: '#eee',
                }),
                singleValue: (base) => ({
                  ...base,
                  color: '#eee',
                }),
                menu: (base) => ({
                  ...base,
                  background: '#2c2c44',
                  color: '#eee',
                }),
              }}
            />
          </SelectBars>
        </UpperToolBar>
      )}

      <CodeEditorContainer>
        <CodeEditor
          currentLanguage={currentLanguage}
          currentTheme={currentTheme.value}
          currentCode={currentCode}
          setCurrentCode={setCurrentCode}
        />
      </CodeEditorContainer>

      <LowerToolBar>
        <button onClick={() => setIsFullScreen((fs) => !fs)}>
          <BiFullscreen /> {isFullScreen ? 'Minimize' : 'Full Screen'}
        </button>

        <label htmlFor="codefile">
          <input
            type="file"
            accept="."
            id="codefile"
            onChange={(e) => getFile(e, setCurrentCode)}
          />{' '}
          <BiImport /> Import Code
        </label>

        <a
          href={`data:text/plain;charset=utf-8,${encodeURIComponent(currentCode)}`}
          download="code.txt"
        >
          <BiExport /> Export Code
        </a>

        <SaveAndRunButton onClick={runCode}>Run Code</SaveAndRunButton>
      </LowerToolBar>
    </StyledEditorContainer>
  )
}

export default EditorContainer
