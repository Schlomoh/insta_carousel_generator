import { createContext, useState } from "react";
import { dummyData } from "./dummyData";

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

const isDev = import.meta.env.DEV && import.meta.env.VITE_USE_DUMMY_DATA;
console.log(isDev);

const useContentState = () => {
  const [posts, setPosts] = useState<null | PostData>(
    isDev ? [dummyData] : null
  );
  const [selectedPost, setSelectedPost] = useState<null | number>(null);
  const [selectedCarouselImage, setSelectedCarouselImage] = useState<null | number>(null); // prettier-ignore

  const addPost = (raw: string) => {
    const post = JSON.parse(raw) as PostDataEntry;
    setPosts((prev) => [...(prev || []), post]);
  };

  const updatePostProperty = (value: string, property: string) => {
    if (selectedPost === null) return;

    const updatedPosts = posts?.map((post, postIndex) =>
      postIndex === selectedPost ? { ...post, [property]: value } : post
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
    updatePostProperty,
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
