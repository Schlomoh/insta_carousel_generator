import { createContext, useState, ReactNode } from "react";
import { RgbColor } from "react-colorful";

interface ProviderProps {
  children: ReactNode;
}

export const CanvasContext = createContext(
  {} as ReturnType<typeof useCanvasState>
);

export const useCanvasState = () => {
  const [canvasHeight, setCanvasHeight] = useState(1200);
  const [canvasWidth, setCanvasWidth] = useState(1080);
  const [scaleFactor, setScaleFactor] = useState(0.45);
  const [textColor, setTextColor] = useState<RgbColor>({ r: 0, g: 0, b: 0 });
  const [backgroundColor, setBackgroundColor] = useState<RgbColor>({ r: 255, g: 255, b: 255 }); // prettier-ignore
  const [titleBackgroundColor, setTitleBackgroundColor] = useState<RgbColor>({ r: 210, g: 210, b: 210 }); // prettier-ignore

  const updateTextColor = (color: RgbColor) => setTextColor(color);
  const updateBackgroundColor = (color: RgbColor) => setBackgroundColor(color);
  const updateTitleBackgroundColor = (color: RgbColor) => setTitleBackgroundColor(color); // prettier-ignore
  const zoom = (factor: number) => setScaleFactor(factor);
  const resize = (height: number, width: number) => {
    setCanvasHeight(height);
    setCanvasWidth(width);
  };

  return {
    canvasHeight,
    canvasWidth,
    scaleFactor,
    textColor,
    backgroundColor,
    titleBackgroundColor,
    updateTextColor,
    updateBackgroundColor,
    updateTitleBackgroundColor,
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
