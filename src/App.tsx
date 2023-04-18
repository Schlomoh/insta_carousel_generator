import styled from "styled-components";
import { Canvas, Controls, SlideIndicator } from "@/components/";
import GlobalStyles from "./GlobalStyles";
import CanvasContextProvider from "./CanvasContext";
import ContentContextProvider from "./ContentContext";

const CenterContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const App = () => {
  return (
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
  );
};

export default App;
