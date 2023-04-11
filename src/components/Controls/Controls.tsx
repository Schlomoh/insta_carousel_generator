import styled from "styled-components";

import { Form } from "../FormElements";
import { ColorPicker } from "./ColorPicker";
import { CanvasResizing } from "./CanvasResizing";
import { useContext } from "react";
import { CanvasContext } from "@/CanvasContext";

const ControlsOverlay = styled.div`
  position: absolute;
  z-index: 5000;
  background-color: grey;

  margin: 1rem;
  padding: 1rem;

  border-radius: 10px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.3);
`;

const Controls = () => {
  const { backgroundColor, textColor, updateBackgroundColor, updateTextColor } =
    useContext(CanvasContext);

  return (
    <ControlsOverlay>
      <Form>
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
      </Form>
    </ControlsOverlay>
  );
};

export default Controls;
