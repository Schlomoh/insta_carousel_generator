import { useContext } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

import { CanvasContext } from "@/CanvasContext";
import { ContentContext } from "@/ContentContext";

import { Form } from "../FormElements";
import { ColorPicker } from "./ColorPicker";
import { CanvasResizing } from "./CanvasResizing";
import { JsonUpload } from "./JsonUpload";
import { PostSelection } from "./PostSelection";
import { ImageUpload } from "./ImageUpload";

const ControlsOverlay = styled(motion.div)`
  position: absolute;
  z-index: 5000;
  background-color: #2f2f2f;
  width: 300px;
  margin: 1rem;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.3);
`;

const Controls: React.FC = () => {
  const { backgroundColor, textColor, updateBackgroundColor, updateTextColor } =
    useContext(CanvasContext);
  const { posts, selectedPost, selectedCarouselImage } =
    useContext(ContentContext);

  const postsPresent = posts !== null;
  const postSelected = selectedPost !== null && selectedCarouselImage !== null;

  return postsPresent ? (
    <ControlsOverlay
      animate={{ opacity: 1, left: 0 }}
      initial={{ opacity: 0, left: "-50%" }}
      transition={{ type: "spring", stiffness: 100, damping: 12 }}
    >
      <PostSelection />
      <AnimatePresence>
        {postSelected && (
          <Form
            initial={{ height: 0 }}
            animate={{ height: "max-content" }}
            exit={{ height: 0 }}
            onSubmit={(e) => e.preventDefault()}
          >
            <CanvasResizing />
            <ColorPicker
              label="Background color"
              color={backgroundColor}
              updateColor={updateBackgroundColor}
            />
            <ColorPicker
              label="Text Color"
              color={textColor}
              updateColor={updateTextColor}
            />
            <JsonUpload />
            <ImageUpload />
          </Form>
        )}
      </AnimatePresence>
    </ControlsOverlay>
  ) : null;
};

export default Controls;
