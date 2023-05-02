import styled from "styled-components";
import { Canvas, Controls, SlideIndicator } from "@/components/";
import GlobalStyles from "./GlobalStyles";
import CanvasContextProvider from "./CanvasContext";
import ContentContextProvider from "./ContentContext";
import PromptContextProvider from "./PromptContext";
import { Suspense } from "react";

const CenterContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const App = () => {
  return (
    <PromptContextProvider>
      <CanvasContextProvider>
        <ContentContextProvider>
          <GlobalStyles />
          <Controls />
          <CenterContainer>
            <Canvas />
            <SlideIndicator />
          </CenterContainer>
        </ContentContextProvider>
      </CanvasContextProvider>
    </PromptContextProvider>
  );
};

export default App;
