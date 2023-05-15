import { useContext } from "react";
import styled from "styled-components";

import { ContentContext } from "@/contexts";
import { Label } from "@/components/FormElements";
import PostItem from "./PostItem";

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemContainer = styled(PostContainer)`
  gap: 0.5rem;
  margin: 0.5rem 0;
`;

const PostSelection = () => {
  const { posts } = useContext(ContentContext);
  const postsPresent = posts !== null;

  return postsPresent ? (
    <PostContainer>
      <Label>Posts</Label>
      <ItemContainer>
        {posts.map((post, i) => (
          <PostItem
            key={i}
            title={posts[i].carouselTexts[0]}
            index={i}
            {...post}
          />
        ))}
      </ItemContainer>
    </PostContainer>
  ) : null;
};

export default PostSelection;
