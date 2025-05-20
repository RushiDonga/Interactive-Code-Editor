import React, { useContext, useState } from "react";
import EditorContainer from "./EditorContainer";
import InputConsole from "./InputConsole";
import OutputConsole from "./OutputConsole";
import Navbar from "./Navbar";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import {
  languageMap,
  PlaygroundContext,
} from "../../context/PlaygroundContext";
import { ModalContext } from "../../context/ModalContext";
import Modal from "../../components/Modal";
import { Buffer } from "buffer";
import axios from "axios";

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: ${({ isFullScreen }) =>
    isFullScreen ? "1fr" : "2.5fr 1.5fr"};
  min-height: ${({ isFullScreen }) =>
    isFullScreen ? "100vh" : "calc(100vh - 60px)"};
  background-color: #121212;
  color: #e0e0e0;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: ${({ isFullScreen }) =>
      isFullScreen ? "1fr" : "auto auto"};
    min-height: 100vh;
  }
`;

const Consoles = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-gap: 1rem;
  padding: 1rem;
  background-color: #1e1e1e;
  border-left: ${({ isFullScreen }) => (isFullScreen ? "none" : "2px solid #2c2c2c")};
  overflow: hidden;

  @media (max-width: 768px) {
    grid-template-rows: ${({ isFullScreen }) => (isFullScreen ? "none" : "1fr 1fr")};
    border-left: none;
    border-top: 2px solid #2c2c2c;
  }
`;

const PlaygroundWrapper = styled.div`
  background-color: #181818;
  border-radius: 12px;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.7);
  overflow: hidden;
`;

const Playground = () => {
  const { folderId, playgroundId } = useParams();
  const { folders, savePlayground } = useContext(PlaygroundContext);
  const { isOpenModal, openModal, closeModal } = useContext(ModalContext);
  const { title, language, code } = folders[folderId].playgrounds[playgroundId];

  const [currentLanguage, setCurrentLanguage] = useState(language);
  const [currentCode, setCurrentCode] = useState(code);
  const [currentInput, setCurrentInput] = useState("");
  const [currentOutput, setCurrentOutput] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);

  const saveCode = () => {
    savePlayground(folderId, playgroundId, currentCode, currentLanguage);
  };

  const encode = (str) => Buffer.from(str, "binary").toString("base64");
  const decode = (str) => Buffer.from(str, "base64").toString();

  const postSubmission = async (language_id, source_code, stdin) => {
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "x-rapidapi-key": "e1a99a894bmsh313ab3b77b7dc5dp1d17d0jsnfbf53d2f53dd",
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        language_id,
        source_code,
        stdin,
      }),
    };

    const res = await axios.request(options);
    return res.data.token;
  };

  const getOutput = async (token) => {
    const options = {
      method: "GET",
      url: "https://judge0-ce.p.rapidapi.com/submissions/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "x-rapidapi-key": "e1a99a894bmsh313ab3b77b7dc5dp1d17d0jsnfbf53d2f53dd",
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      },
    };

    const res = await axios.request(options);
    if (res.data.status_id <= 2) {
      // wait and retry while processing
      await new Promise((r) => setTimeout(r, 1500));
      return getOutput(token);
    }
    return res.data;
  };

  const runCode = async () => {
    openModal({
      show: true,
      modalType: 6,
      identifiers: {
        folderId: "",
        cardId: "",
      },
    });

    const language_id = languageMap[currentLanguage].id;
    const source_code = encode(currentCode);
    const stdin = encode(currentInput);

    const token = await postSubmission(language_id, source_code, stdin);

    const res = await getOutput(token);

    const status_name = res.status.description;
    const decoded_output = decode(res.stdout || "");
    const decoded_compile_output = decode(res.compile_output || "");
    const decoded_error = decode(res.stderr || "");

    let final_output = "";
    if (res.status_id !== 3) {
      final_output = decoded_compile_output || decoded_error || "Unknown error";
    } else {
      final_output = decoded_output;
    }

    setCurrentOutput(`${status_name}\n\n${final_output}`);
    closeModal();
  };

  const getFile = (e, setState) => {
    const input = e.target;
    if ("files" in input && input.files.length > 0) {
      placeFileContent(input.files[0], setState);
    }
  };

  const placeFileContent = (file, setState) => {
    readFileContent(file)
      .then((content) => setState(content))
      .catch((error) => console.error(error));
  };

  function readFileContent(file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  }

  return (
    <>
      <Navbar isFullScreen={isFullScreen} />
      <MainContainer isFullScreen={isFullScreen}>
        <PlaygroundWrapper>
          <EditorContainer
            title={title}
            currentLanguage={currentLanguage}
            setCurrentLanguage={setCurrentLanguage}
            currentCode={currentCode}
            setCurrentCode={setCurrentCode}
            folderId={folderId}
            playgroundId={playgroundId}
            saveCode={saveCode}
            runCode={runCode}
            getFile={getFile}
            isFullScreen={isFullScreen}
            setIsFullScreen={setIsFullScreen}
          />
        </PlaygroundWrapper>
        <Consoles isFullScreen={isFullScreen}>
          <InputConsole
            currentInput={currentInput}
            setCurrentInput={setCurrentInput}
            getFile={getFile}
          />
          <OutputConsole currentOutput={currentOutput} />
        </Consoles>
      </MainContainer>
      {isOpenModal.show && <Modal />}
    </>
  );
};

export default Playground;
