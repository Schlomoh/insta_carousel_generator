import { CSSProperties } from "react";
import styled from "styled-components";

const Textarea = styled.textarea<{
  width?: CSSProperties["width"];
  padding?: CSSProperties["padding"];
}>`
  width: ${({ width }) => (width ? width : "unset")};
  resize: vertical;
  min-height: 6rem;
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

export default Textarea;
