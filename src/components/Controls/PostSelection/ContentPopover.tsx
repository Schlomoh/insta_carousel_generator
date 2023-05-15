import { useContext } from "react";
import styled from "styled-components";

import { ContentContext } from "@/contexts";
import { Popover } from "@/components/Popover";
import { ControlsButton, Label } from "@/components/FormElements";
import { Arrow, PostItemProps } from "./PostItem";

interface ContentPopoverProps extends PostItemProps {
  triggerRef: React.RefObject<HTMLElement>;
  show: boolean;
  clickHandler: () => void;
}

const TextContainer = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  max-width: 90%;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ContentPopover: React.FC<ContentPopoverProps> = (props) => {
  const { index, triggerRef, clickHandler, show } = props;

  const { posts, selectedCarouselImage, setSelectedCarouselImage } = useContext(
    ContentContext
  );

  const post = posts?.[index];
  const reelText = post?.carouselTexts;

  const handleClick = (carouselIndex: number) => {
    setSelectedCarouselImage(carouselIndex);
    clickHandler();
  };

  return (
    <Popover show={show} onClose={clickHandler} trigger={triggerRef}>
      <ItemContainer>
        <Label>Carousel images</Label>
        {reelText?.map((text, i) => (
          <ControlsButton
            key={text}
            onClick={() => handleClick(i)}
            highlight={i === selectedCarouselImage}
          >
            <TextContainer>{text}</TextContainer>
            <Arrow />
          </ControlsButton>
        ))}
      </ItemContainer>
    </Popover>
  );
};

export default ContentPopover;
