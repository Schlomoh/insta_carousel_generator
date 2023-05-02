import { useContext, useEffect } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

import { CanvasContext } from "@/CanvasContext";
import { ContentContext } from "@/ContentContext";

import { Form, Label } from "../FormElements";
import { ColorPicker } from "./ColorPicker";
import { CanvasResizing } from "./CanvasResizing";
import { JsonUpload } from "./JsonUpload";
import { PostSelection } from "./PostSelection";
import { ImageUpload } from "./ImageUpload";
import { ExportButton } from "./ExportButton";
import CaptionTextarea from "./CaptionTextarea/CaptionTextarea";

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
  const {
    backgroundColor,
    titleBackgroundColor,
    textColor,
    updateBackgroundColor,
    updateTitleBackgroundColor,
    updateTextColor,
  } = useContext(CanvasContext);
  const contentValues = useContext(ContentContext);

  const { posts, selectedPost, selectedCarouselImage } = contentValues;

  const postsPresent = posts !== null;
  const postSelected = selectedPost !== null && selectedCarouselImage !== null;
  const addedImage = posts?.[selectedPost || 0]?.titleImageSrc;

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
            {addedImage && (
              <ColorPicker
                label="Title background color"
                color={titleBackgroundColor}
                updateColor={updateTitleBackgroundColor}
              />
            )}
            <CaptionTextarea />
            {/* <JsonUpload /> */}
            <Label>Actions</Label>
            <ImageUpload />
            <ExportButton />
          </Form>
        )}
      </AnimatePresence>
    </ControlsOverlay>
  ) : null;
};

export default Controls;
