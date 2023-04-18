import { useContext } from "react";
import styled from "styled-components";
import Sketch from "react-p5";

import { CanvasContext } from "@/CanvasContext";
import { ContentContext } from "@/ContentContext";
import useP5Canvas from "./useP5Canvas";
import Placeholder from "./Placeholder";
import { AnimatePresence, motion } from "framer-motion";

interface CanvasContainerProps {
  canvasHeight: number;
  canvasWidth: number;
  scaleFactor: number;
}

// Styled component for the canvas container
const CanvasContainer = styled.div<CanvasContainerProps>`
  height: ${({ canvasHeight, scaleFactor }) => canvasHeight * scaleFactor}px;
  width: ${({ canvasWidth, scaleFactor }) => canvasWidth * scaleFactor}px;

  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.3);

  .react-p5 {
    height: inherit;
    width: inherit;
  }
`;

// The main Canvas component
const Canvas = () => {
  const canvasState = useContext(CanvasContext);
  const { selectedPost, selectedCarouselImage } = useContext(ContentContext);
  const { setup, draw } = useP5Canvas();

  return (
    <AnimatePresence>
      {selectedPost !== null && selectedCarouselImage !== null ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <CanvasContainer {...canvasState}>
            <Sketch setup={setup} draw={draw} />
          </CanvasContainer>
        </motion.div>
      ) : (
        <Placeholder />
      )}
    </AnimatePresence>
  );
};
export default Canvas;
