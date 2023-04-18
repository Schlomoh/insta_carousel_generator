import { createContext, useEffect, useState } from "react";

interface ProviderProps {
  children: React.ReactNode;
}

interface PostDataEntry {
  title: string;
  title_image_src?: string;
  reel_text: string[];
  caption: string;
  hashtags: string[];
}

type PostData = PostDataEntry[];

export const ContentContext = createContext(
  {} as ReturnType<typeof useContentState>
);

const useContentState = () => {
  const [posts, setPosts] = useState<null | PostData>(null);
  const [selectedPost, setSelectedPost] = useState<null | number>(null);
  const [selectedCarouselImage, setSelectedCarouselImage] = useState<null | number>(null); // prettier-ignore

  const setPostsText = (raw: string) => {
    setPosts(JSON.parse(raw) as PostData);
  };

  const setTitleImageSrc = (imageSrc: string) => {
    if (selectedPost === null) return;

    const updatedPosts = posts?.map((post, postIndex) =>
      postIndex === selectedPost ? { ...post, title_image_src: imageSrc } : post
    );

    setPosts(updatedPosts || null);
  };

  return {
    posts,
    selectedPost,
    selectedCarouselImage,
    setPostsText,
    setSelectedPost,
    setSelectedCarouselImage,
    setTitleImageSrc,
  };
};

const ContentContextProvider = ({ children }: ProviderProps) => {
  const contentState = useContentState();

  return (
    <ContentContext.Provider value={contentState}>
      {children}
    </ContentContext.Provider>
  );
};

export default ContentContextProvider;
