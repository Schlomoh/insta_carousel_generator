import { useContext } from "react";
import styled from "styled-components";

import { Canvas, Controls } from "@/components/";
import GlobalStyles from "./GlobalStyles";
import CanvasContextProvider, { CanvasContext } from "./CanvasContext";

const App = () => {
  return (
    <CanvasContextProvider>
      <GlobalStyles />
      <Controls />
      <Canvas />
    </CanvasContextProvider>
  );
};

export default App;
