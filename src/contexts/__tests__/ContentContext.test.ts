import { renderHook, waitFor } from "@testing-library/react";
import { PostDataEntry, useCanvasState, useContentState } from "@/contexts";
import { dummyData } from "../dummyData";

test("Successfully add new post from string", async () => {
  const { result } = renderHook(() => useContentState());

  const basePost = {
    titleImageSrc: "test",
    carouselTexts: ["one", "two", "three"],
    caption: "test",
    hashtags: ["test"],
  } as PostDataEntry;
  const newPost = {
    titleImageSrc: "test",
    carouselTexts: ["four", "five", "six"],
    caption: "test",
    hashtags: ["test"],
  } as PostDataEntry;

  result.current.addPost(JSON.stringify(basePost));
  result.current.addPost(JSON.stringify(newPost));
  
  await waitFor(() =>
    expect(result.current.posts).toEqual([basePost, newPost])
  );
});
