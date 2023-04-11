import { createContext, useState } from "react";
import { RgbColor } from "react-colorful";

interface ProviderProps {
  children: React.ReactNode;
}

const initialState = {
  canvasHeight: 1920,
  canvasWidth: 1080,
  scaleFactor: 0.4, // to make canvas fit the screen
  backgroundColor: { r: 255, g: 255, b: 255 } as RgbColor,
  textColor: { r: 0, g: 0, b: 0 } as RgbColor,

  updateBackgroundColor: ({ r, g, b }: RgbColor) => {}, // placeholder
  updateTextColor: ({ r, g, b }: RgbColor) => {}, // placeholder
  resize: (height: number, width: number) => {}, // placeholder
  zoom: (factor: number) => {},
};

export const CanvasContext = createContext(initialState);

const CanvasContextProvider = ({ children }: ProviderProps) => {
  const [canvasHeight, setCanvasHeight] = useState(initialState.canvasHeight);
  const [canvasWidth, setCanvasWidth] = useState(initialState.canvasWidth);
  const [scaleFactor, setScaleFactor] = useState(initialState.scaleFactor);
  const [textColor, setTextColor] = useState<RgbColor>(initialState.textColor); // prettier-ignore
  const [backgroundColor, setBackgroundColor] = useState<RgbColor>(initialState.backgroundColor); // prettier-ignore

  const updateTextColor = ({ r, g, b }: RgbColor) => {
    setTextColor({ r, g, b });
  };

  const updateBackgroundColor = ({ r, g, b }: RgbColor) => {
    setBackgroundColor({ r, g, b });
  };

  const resize = (height: number, width: number) => {
    setCanvasHeight(height);
    setCanvasWidth(width);
  };

  const zoom = (factor: number) => {
    setScaleFactor(factor);
  };

  const canvasState = {
    canvasHeight,
    canvasWidth,
    scaleFactor,
    textColor,
    backgroundColor,
    updateTextColor,
    updateBackgroundColor,
    resize,
    zoom,
  };

  return (
    <CanvasContext.Provider value={canvasState}>
      {children}
    </CanvasContext.Provider>
  );
};

export default CanvasContextProvider;
