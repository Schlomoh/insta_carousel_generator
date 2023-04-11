import { useEffect, useRef, useState } from "react";
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
  width: 100%;
  height: 2rem;
  border-radius: 5px;
  cursor: pointer;
`;

const useClickOutside = (
  ref: React.RefObject<HTMLDivElement>,
  handler: () => void
) => {
  useEffect(() => {
    const handleMouseDown = (e: PointerEvent) => {
      const { current: el } = ref;
      if (el && e.target && !el.contains(e.target as Node)) {
        handler();
      }
    };

    document.addEventListener("pointerdown", handleMouseDown);
    return () => document.removeEventListener("pointerdown", handleMouseDown);
  }, [ref, handler]);
};

const ColorPicker = ({ label, ...props }: ColorPickerProps) => {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setShow(false));

  const toggleShow = () => setShow((prevShow) => !prevShow);

  return (
    <div ref={ref}>
      <Label>{label}</Label>
      <PickerPopover show={show} {...props} />
      <ColorPreview bgColor={props.color} onClick={toggleShow} />
    </div>
  );
};

export default ColorPicker;
