import { createContext, useState } from "react";
import { RgbColor } from "react-colorful";

interface ProviderProps {
  children: React.ReactNode;
}

export const CanvasContext = createContext(
  {} as ReturnType<typeof useCanvasState>
);

const useCanvasState = () => {
  const [canvasHeight, setCanvasHeight] = useState(1920);
  const [canvasWidth, setCanvasWidth] = useState(1080);
  const [scaleFactor, setScaleFactor] = useState(0.4);
  const [textColor, setTextColor] = useState<RgbColor>({ r: 0, g: 0, b: 0 });
  const [backgroundColor, setBackgroundColor] = useState<RgbColor>({
    r: 255,
    g: 255,
    b: 255,
  });

  const updateTextColor = (color: RgbColor) => setTextColor(color);
  const updateBackgroundColor = (color: RgbColor) => setBackgroundColor(color);
  const resize = (height: number, width: number) => {
    setCanvasHeight(height);
    setCanvasWidth(width);
  };
  const zoom = (factor: number) => setScaleFactor(factor);

  return {
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
};

const CanvasContextProvider = ({ children }: ProviderProps) => {
  const canvasState = useCanvasState();

  return (
    <CanvasContext.Provider value={canvasState}>
      {children}
    </CanvasContext.Provider>
  );
};

export default CanvasContextProvider;
