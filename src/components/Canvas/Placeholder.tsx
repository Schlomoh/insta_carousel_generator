import { useContext } from "react";
import styled from "styled-components";

import { ContentContext } from "@/ContentContext";
import { JsonUpload } from "../Controls/JsonUpload";

const PlaceholderContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    color: #ddd;
  }
  user-select: none;
`;

const Placeholder = () => {
  const { posts } = useContext(ContentContext);
  const postsPresent = posts !== null;

  const NoData = () => (
    <>
      <h2>No data</h2>
      <JsonUpload />
    </>
  );

  return (
    <PlaceholderContainer>
      {postsPresent ? <h2>Select a post</h2> : <NoData />}
    </PlaceholderContainer>
  );
};

export default Placeholder;
