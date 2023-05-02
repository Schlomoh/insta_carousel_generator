import styled from "styled-components";
import { Canvas, Controls, SlideIndicator } from "@/components/";
import GlobalStyles from "./GlobalStyles";
import CanvasContextProvider from "./CanvasContext";
import ContentContextProvider from "./ContentContext";
import PromptContextProvider from "./PromptContext";
import { Suspense } from "react";
import { Label } from "./components/FormElements";

const CenterContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const App = () => {
  return (
    <>
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
      <footer
        style={{
          position: "absolute",
          bottom: 0,
          marginBottom: "1rem",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          zIndex: 1000,
        }}
      >
        <Label>
          Created by <a target="_blank" style={{color: 'white'}} href="https://moritzbecker.de">Moritz Becker</a> with ❤️
        </Label>
      </footer>
    </>
  );
};

export default App;
