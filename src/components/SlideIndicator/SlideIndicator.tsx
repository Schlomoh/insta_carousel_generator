import { ContentContext } from "@/ContentContext";
import { useContext } from "react";
import styled from "styled-components";

type Directions = "left" | "right";

const Arrow = styled.div<{ direction: Directions }>`
  height: 10px;
  width: 10px;
  transform: rotate(
    ${({ direction }) => (direction === "right" ? "45deg" : "-135deg")}
  );
  border-top: 1px solid #ddd;
  border-right: 1px solid #ddd;
`;

const StyledSlideIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  border-radius: 5px;
  overflow: hidden;
  background-color: #2f2f2f;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.3);
  user-select: none;

  p {
    color: #ddd;
    margin: 0.5rem 1rem;
  }
`;

const IndicatorButton = styled.div`
  height: 100%;
  padding: 0 0.5rem;
  cursor: pointer;
  transition: all 0.3s;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  :hover {
    background-color: rgba(200, 200, 200, 0.3);
  }
`;

const SlideIndicator: React.FC = () => {
  const {
    selectedCarouselImage,
    posts,
    selectedPost,
    setSelectedCarouselImage,
  } = useContext(ContentContext);

  const texts = posts?.[selectedPost || 0]?.carouselTexts;

  const handleClick = (direction: Directions) => {
    if (selectedCarouselImage === null || !texts) return;

    const newIndex =
      direction === "left"
        ? Math.max(selectedCarouselImage - 1, 0)
        : Math.min(selectedCarouselImage + 1, texts.length - 1);

    setSelectedCarouselImage(newIndex);
  };

  return selectedCarouselImage !== null && texts ? (
    <StyledSlideIndicator>
      <IndicatorButton onClick={() => handleClick("left")}>
        <Arrow direction="left" />
      </IndicatorButton>
      <p>
        {selectedCarouselImage + 1} / {texts.length}
      </p>
      <IndicatorButton onClick={() => handleClick("right")}>
        <Arrow direction="right" />
      </IndicatorButton>
    </StyledSlideIndicator>
  ) : null;
};

export default SlideIndicator;
