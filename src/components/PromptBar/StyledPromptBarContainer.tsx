import styled from "styled-components";

const StyledPromptBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 650px;
  max-width: calc(100vw - 2rem);
  margin: 1rem;

  h3 {
    margin: 0;
    margin-bottom: 0.5rem;
  }
`;

export default StyledPromptBarContainer;
