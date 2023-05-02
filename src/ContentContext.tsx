import { createContext, useState } from "react";

interface ProviderProps {
  children: React.ReactNode;
}

interface PostDataEntry {
  titleImageSrc?: string;
  carouselTexts: string[];
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

  const addPost = (raw: string) => {
    const post = JSON.parse(raw) as PostDataEntry;
    setPosts((prev) => [...(prev || []), post]);
  };

  const setTitleImageSrc = (imageSrc: string) => {
    if (selectedPost === null) return;

    const updatedPosts = posts?.map((post, postIndex) =>
      postIndex === selectedPost ? { ...post, titleImageSrc: imageSrc } : post
    );

    setPosts(updatedPosts || null);
  };

  return {
    posts,
    selectedPost,
    selectedCarouselImage,
    addPost,
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
