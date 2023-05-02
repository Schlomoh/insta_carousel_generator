import { Suspense, useContext, useEffect } from "react";
import styled from "styled-components";

import { ContentContext } from "@/ContentContext";
import { PromptBar } from "../PromptBar";
import { PromptContext } from "@/PromptContext";
import { ClimbingBoxLoader } from "react-spinners";
import { useFetchOpenAiData } from "@/OpenAiRequest";

const InstructionsContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;

  h2 {
    color: #ddd;
  }
`;

const Loading = () => {
  return (
    <>
      <ClimbingBoxLoader speedMultiplier={0.75} color="#ddd" />
      <p style={{ color: "#ddd" }}>Loading...</p>
    </>
  );
};

const Selection = () => {
  const { posts, addPost } = useContext(ContentContext);
  const { promptData, finished } = useContext(PromptContext);

  const data = useFetchOpenAiData(promptData, finished);

  useEffect(() => {
    if (!data) return;
    const { content } = data.choices[0].message;
    addPost(content);
  }, [data]);

  const postsPresent = posts !== null;
  return postsPresent ? <h2>Select a post</h2> : null;
};

const Instructions = () => {
  const { finished } = useContext(PromptContext);

  return (
    <InstructionsContainer>
      <Suspense fallback={<Loading />}>
        {finished ? <Selection /> : <PromptBar />}
      </Suspense>
    </InstructionsContainer>
  );
};

export default Instructions;
