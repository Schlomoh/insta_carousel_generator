import { CanvasContext } from "@/CanvasContext";
import { Input, Label } from "@/components/FormElements";
import { useContext, useEffect, useState } from "react";

const CanvasResizing = () => {
  const { canvasHeight, canvasWidth, scaleFactor, resize, zoom } =
    useContext(CanvasContext);

  const [height, setHeight] = useState(canvasHeight);
  const [width, setWidth] = useState(canvasWidth);
  const [zoomFactor, setZoomFactor] = useState(scaleFactor);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "height") {
      setHeight(Number(value));
    } else if (name === "width") {
      setWidth(Number(value));
    } else if (name === "zoom") {
      setZoomFactor(Number(value));
    }
  };

  useEffect(() => {
    resize(height, width);
  }, [height, width]);

  useEffect(() => {
    zoom(zoomFactor);
  }, [zoomFactor]);

  return (
    <>
      <Label htmlFor="height">Height</Label>
      <Input
        type="number"
        placeholder="Height"
        name="height"
        id="height"
        value={canvasHeight}
        onChange={handleInputChange}
      />

      <Label htmlFor="width">Width</Label>
      <Input
        type="number"
        placeholder="Width"
        name="width"
        id="width"
        value={canvasWidth}
        onChange={handleInputChange}
      />

      <Label htmlFor="zoom">Zoom</Label>
      <Input
        type="number"
        placeholder="Zoom"
        name="zoom"
        id="zoom"
        value={scaleFactor}
        step={0.05}
        onChange={handleInputChange}
      />
    </>
  );
};

export default CanvasResizing;
