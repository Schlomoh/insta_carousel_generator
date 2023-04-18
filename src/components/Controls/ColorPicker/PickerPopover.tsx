import { RefObject, useCallback, useEffect, useState } from "react";
import { RgbColor, RgbColorPicker } from "react-colorful";
import styled from "styled-components";

import { Input, Label } from "@/components/FormElements";
import { Popover } from "@/components/Popover";

interface PopoverProps {
  show: boolean;
  onClose: () => void;
  trigger: RefObject<HTMLElement>;
  color: RgbColor;
  updateColor: (color: RgbColor) => void;
}

const StyledColorPicker = styled(RgbColorPicker)`
  width: 100% !important;
`;

const rgbToHex = ({ r, g, b }: RgbColor) =>
  "#" + [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("");

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return (
    result && {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    }
  );
};

const PickerPopover = ({ color, updateColor, ...props }: PopoverProps) => {
  const [hexValue, setHexValue] = useState(() => rgbToHex(color));

  const handleHexChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newHex = e.target.value;
      setHexValue(newHex);
      const newRgb = hexToRgb(newHex);
      if (newRgb) updateColor(newRgb);
    },
    [updateColor]
  );

  useEffect(() => {
    setHexValue(rgbToHex(color));
  }, [color]);

  return (
    <Popover {...props}>
      <StyledColorPicker color={color} onChange={updateColor} />
      <Label>Hex code</Label>
      <Input
        type="text"
        value={hexValue}
        onChange={handleHexChange}
        autoCorrect="off"
        autoCapitalize="off"
        autoComplete="off"
        spellCheck="false"
      />
    </Popover>
  );
};

export default PickerPopover;
