import { CSSProperties } from "react";
import styled from "styled-components";

const Input = styled.input<{
  width?: CSSProperties["width"];
  padding?: CSSProperties["padding"];
}>`
  &[type="number"] {
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;
  }

  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }

  width: ${({ width }) => (width ? width : "unset")};

  padding: ${({ padding }) => (padding ? padding : ".5rem")};
  background-color: transparent;
  color: white;
  border: #666 1px solid;
  border-radius: 5px;
  box-sizing: border-box;

  transition: all 0.2s;

  :focus,
  :active {
    border-bottom: #ddd 3px solid;
    margin-bottom: -2px;
    outline: none;
  }
`;

export default Input;
