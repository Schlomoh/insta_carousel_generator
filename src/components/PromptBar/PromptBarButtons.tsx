import { PromptContext } from "@/PromptContext";
import { ButtonHTMLAttributes, useContext } from "react";
import styled from "styled-components";
import { Prompts } from "./PromptBar";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

interface PromptBarButtonsProps {
  name: string;
  inputIndex: number;
  prompts: Prompts;
  handleNavigation: (step: number) => void;
}

const StyledButton = styled.button`
  height: 1.5rem;
  border: 0;
  border-radius: 2.5px;
  background-color: #aaa;
  color: #1b1b1b;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #555;
  }
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  width: 0;
  position: relative;
  right: 0.75rem;
`;

const PromptBarButton = ({ text, ...rest }: ButtonProps) => (
  <StyledButton {...rest}>{text}</StyledButton>
);

const PromptBarButtons = (props: PromptBarButtonsProps) => {
  const { name, inputIndex, prompts, handleNavigation } = props;
  const { promptData } = useContext(PromptContext);

  return (
    <StyledButtonWrapper>
      {inputIndex > 0 && (
        <PromptBarButton text="Back" onClick={() => handleNavigation(-1)} />
      )}
      <PromptBarButton
        text={inputIndex < prompts.length - 1 ? "Next" : "Finish"}
        onClick={() => handleNavigation(1)}
        disabled={!promptData[name]}
      />
    </StyledButtonWrapper>
  );
};

export default PromptBarButtons;
