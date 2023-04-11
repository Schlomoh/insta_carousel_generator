import { useContext, useEffect, useRef } from "react";
import p5Types from "p5";
import Sketch from "react-p5";
import { CanvasContext } from "@/CanvasContext";
import styled from "styled-components";

interface CanvasContainerProps {
  canvasHeight: number;
  canvasWidth: number;
  scaleFactor: number;
}

// Styled component for the canvas container
const CanvasContainer = styled.div<CanvasContainerProps>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.3);

  .react-p5 {
    height: ${({ canvasHeight, scaleFactor }) => canvasHeight * scaleFactor}px;
    width: ${({ canvasWidth, scaleFactor }) => canvasWidth * scaleFactor}px;
  }
`;

// Custom hook for handling p5 canvas setup and draw logic
const useP5Canvas = () => {
  const canvasState = useContext(CanvasContext);
  const content = useRef<p5Types.Graphics | null>(null);
  const p5Instance = useRef<p5Types | null>(null);

  // Redraw the canvas whenever the state changes
  useEffect(() => {
    p5Instance.current?.redraw();
  }, [canvasState]);

  // Set up the p5 canvas
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    const { canvasWidth, canvasHeight, scaleFactor } = canvasState;
    const scaledWidth = canvasWidth * scaleFactor;
    const scaledHeight = canvasHeight * scaleFactor;

    p5.createCanvas(scaledWidth, scaledHeight).parent(canvasParentRef);
    content.current = p5.createGraphics(canvasWidth, canvasHeight);
    p5.noLoop();
    p5Instance.current = p5;
  };

  // Draw content on the p5 canvas
  const draw = (p5: p5Types) => {
    const text = "This is a very long test string.";
    const {
      canvasWidth,
      canvasHeight,
      scaleFactor,
      backgroundColor,
      textColor,
    } = canvasState;
    const scaledWidth = canvasWidth * scaleFactor;
    const scaledHeight = canvasHeight * scaleFactor;

    if (content.current) {
      const { current } = content;

      // Configure the graphics object
      current.resizeCanvas(canvasWidth, canvasHeight);
      current
        .background(backgroundColor.r, backgroundColor.g, backgroundColor.b)
        .textSize(100)
        .textAlign(p5.CENTER, p5.CENTER)
        .textStyle(p5.BOLD)
        .fill(textColor.r, textColor.g, textColor.b)
        .text(text, 0, 0, canvasWidth, canvasHeight);

      // Resize and draw the canvas
      p5.resizeCanvas(scaledWidth, scaledHeight);
      p5.image(current, 0, 0, scaledWidth, scaledHeight);
    }
  };

  return { setup, draw };
};

// The main Canvas component
const Canvas = () => {
  const canvasState = useContext(CanvasContext);
  const { setup, draw } = useP5Canvas();

  return (
    <CanvasContainer {...canvasState}>
      <Sketch setup={setup} draw={draw} />
    </CanvasContainer>
  );
};

export default Canvas;
