import { useEffect, useId, useRef, useState } from "react";
import { RgbColor } from "react-colorful";
import styled from "styled-components";

import { Label } from "@/components/FormElements";
import PickerPopover from "./PickerPopover";

interface ColorPickerProps {
  label: string;
  color: RgbColor;
  updateColor: (color: RgbColor) => void;
}

interface ColorPreviewProps {
  bgColor: RgbColor;
}

const ColorPreview = styled.div.attrs<ColorPreviewProps>(
  ({ bgColor: { r, g, b } }) => ({
    style: {
      backgroundColor: `rgb(${r}, ${g}, ${b})`,
    },
  })
)<ColorPreviewProps>`
  border: 1px solid #ddd;
  width: calc(100% - 2px);
  height: 2rem;
  border-radius: 5px;
  cursor: pointer;
`;

const ColorPicker = ({ label, ...props }: ColorPickerProps) => {
  const [show, setShow] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  const toggleShow = () => {
    setShow((prevShow) => !prevShow);
  };

  return (
    <>
      <Label>{label}</Label>
      <PickerPopover
        show={show}
        onClose={toggleShow}
        trigger={triggerRef}
        {...props}
      />
      <ColorPreview
        bgColor={props.color}
        onClick={toggleShow}
        ref={triggerRef}
      />
    </>
  );
};

export default ColorPicker;
