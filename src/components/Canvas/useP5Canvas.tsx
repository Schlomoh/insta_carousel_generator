import { useContext, useEffect, useRef, useState } from "react";
import p5Types from "p5";

import { CanvasContext } from "@/CanvasContext";
import { ContentContext } from "@/ContentContext";

const useP5Canvas = () => {
  const canvasState = useContext(CanvasContext);
  const contentState = useContext(ContentContext);
  const { posts, selectedPost } = contentState;

  const contentRef = useRef<p5Types.Graphics | null>(null);
  const p5InstanceRef = useRef<p5Types | null>(null);
  const [loadedImage, setLoadedImage] = useState<p5Types.Image | null>(null);

  useEffect(() => {
    p5InstanceRef.current?.redraw();
  }, [loadedImage]);

  const imageSrc = posts?.[selectedPost || 0]?.title_image_src;

  useEffect(() => {
    setLoadedImage(null);
  }, [imageSrc]);

  useEffect(() => {
    p5InstanceRef.current?.redraw();
  }, [canvasState, contentState]);

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    const { canvasWidth, canvasHeight, scaleFactor } = canvasState;
    const scaledCanvasWidth = canvasWidth * scaleFactor;
    const scaledCanvasHeight = canvasHeight * scaleFactor;

    p5.createCanvas(scaledCanvasWidth, scaledCanvasHeight).parent(
      canvasParentRef
    );
    contentRef.current = p5.createGraphics(canvasWidth, canvasHeight);
    p5.noLoop();
    p5InstanceRef.current = p5;
  };

  const draw = (p5: p5Types) => {
    const { canvasWidth, canvasHeight, backgroundColor, textColor, scaleFactor } = canvasState; // prettier-ignore
    const { selectedCarouselImage } = contentState;

    const scaledCanvasWidth = canvasWidth * scaleFactor;
    const scaledCanvasHeight = canvasHeight * scaleFactor;

    const text = posts?.[selectedPost || 0]?.reel_text[selectedCarouselImage || 0]; // prettier-ignore

    if (!contentRef.current || selectedCarouselImage === null || !text) return;

    const graphics = contentRef.current;
    graphics.resizeCanvas(canvasWidth, canvasHeight);
    graphics.background(backgroundColor.r, backgroundColor.g, backgroundColor.b); // prettier-ignore
    graphics.textSize(100).textAlign(p5.CENTER, p5.CENTER).textStyle(p5.BOLD);
    graphics.fill(textColor.r, textColor.g, textColor.b);

    if (selectedCarouselImage === 0 && imageSrc) {
      if (!loadedImage) {
        p5.loadImage(imageSrc, setLoadedImage);
      } else {
        const { width, height } = loadedImage;
        const scaleFactor = Math.max(canvasWidth / width, canvasHeight / height); // prettier-ignore
        const offsetX = (canvasWidth - width * scaleFactor) / 2;
        const offsetY = (canvasHeight - height * scaleFactor) / 2;

        graphics.image(loadedImage, offsetX, offsetY, width * scaleFactor, height * scaleFactor) // prettier-ignore
      }
    }

    graphics.text(
      text,
      canvasWidth * 0.05,
      0,
      canvasWidth - canvasWidth * 0.1,
      canvasHeight
    ).background(255);

    p5.resizeCanvas(scaledCanvasWidth, scaledCanvasHeight);
    p5.image(graphics, 0, 0, scaledCanvasWidth, scaledCanvasHeight);
  };

  return { setup, draw };
};

export default useP5Canvas;
