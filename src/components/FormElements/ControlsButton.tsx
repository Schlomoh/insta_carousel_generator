import styled from "styled-components";

interface ControlsButtonProps {
  highlight?: boolean;
}

const ControlsButton = styled.button<ControlsButtonProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  gap: 1rem;

  color: #ddd;
  background-color: transparent;
  padding: 0.5rem;
  border: ${({ highlight }) => (highlight ? "#ddd" : "#666")} 1px solid;
  border-radius: 5px;
  border-bottom-width: ${({ highlight }) => (highlight ? "3px" : "1px")};
  cursor: pointer;
  transition: all 0.3s;

  :hover {
    background-color: rgba(200, 200, 200, 0.3);
  }
  :active {
    background-color: rgba(0, 0, 0, 0.3);
  }

  user-select: none;
  outline: none;
`;

export default ControlsButton;
