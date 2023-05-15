import styled from "styled-components";
import { Canvas, Controls, SlideIndicator } from "@/components/";
import { Label } from "@/components/FormElements";
import {
  CanvasContextProvider,
  ContentContextProvider,
  PromptContextProvider,
} from "@/contexts";
import GlobalStyles from "./GlobalStyles";

const CenterContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Footer = styled.footer`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  bottom: 0;
  margin-bottom: 1rem;
  z-index: 1000;
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
      <Footer>
        <Label>
          Created by{" "}
          <a
            target="_blank"
            style={{ color: "white" }}
            href="https://moritzbecker.de"
          >
            Moritz Becker
          </a>{" "}
          with ❤️
        </Label>
      </Footer>
    </>
  );
};

export default App;
