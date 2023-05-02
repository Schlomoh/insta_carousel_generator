import { useContext } from "react";
import styled from "styled-components";
import Sketch from "react-p5";

import { CanvasContext } from "@/CanvasContext";
import { ContentContext } from "@/ContentContext";
import useP5Canvas from "./useP5Canvas";
import Instructions from "./Instructions";
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

const Canvas = () => {
  const canvasState = useContext(CanvasContext);
  const { canvasHeight, scaleFactor } = canvasState;
  const { selectedPost, selectedCarouselImage } = useContext(ContentContext);
  const { setup, draw } = useP5Canvas();

  // the div conatining the motion div is an offset because the motion div is absolutely positioned
  return (
    <AnimatePresence>
      <div style={{ height: `${canvasHeight * scaleFactor}px` }}>
        {selectedPost !== null && selectedCarouselImage !== null ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            key={selectedCarouselImage}
          >
            <CanvasContainer {...canvasState}>
              <Sketch setup={setup} draw={draw} />
            </CanvasContainer>
          </motion.div>
        ) : (
          <Instructions />
        )}
      </div>
    </AnimatePresence>
  );
};
export default Canvas;
