import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { ContentContext } from "@/ContentContext";
import ContentPopover from "./ContentPopover";
import { ControlsButton } from "@/components/FormElements";

export interface PostItemProps {
  title: string;
  index: number;
}

export const Arrow = styled.div`
  height: 8px;
  width: 8px;
  transform: rotate(45deg);

  border-top: 1px solid #ddd;
  border-right: 1px solid #ddd;
`;

const PostItem = (props: PostItemProps) => {
  const { title, index } = props;
  const { selectedPost, setSelectedPost, setSelectedCarouselImage } = useContext(ContentContext); // prettier-ignore

  const [show, setShow] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    selectedPost !== index && setSelectedCarouselImage(null);
    setSelectedPost(index);
    setShow(!show);
  };

  return (
    <>
      <ContentPopover
        clickHandler={handleClick}
        show={show}
        triggerRef={triggerRef}
        {...props}
      />
      <ControlsButton
        onClick={handleClick}
        ref={triggerRef}
        highlight={selectedPost === index}
      >
        <span>{title}</span>
        <Arrow />
      </ControlsButton>
    </>
  );
};

export default PostItem;
