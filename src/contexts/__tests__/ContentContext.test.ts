import { renderHook, act, waitFor } from "@testing-library/react";
import ContentContextProvider, {
  useContentState,
  PostDataEntry,
} from "../ContentContext";
import { RenderHookResult } from "@testing-library/react";

// Define your basePost outside to avoid re-definition in every test case
const basePost: PostDataEntry = {
  titleImageSrc: "test",
  carouselTexts: ["one", "two", "three"],
  caption: "test",
  hashtags: ["test"],
};

const setup = () => {
  return renderHook(() => useContentState(), {
    wrapper: ContentContextProvider,
  }).result;
};

let result: ReturnType<typeof setup>;

beforeEach(() => {
  result = setup();
});

describe("Successfully add new post from string", () => {
  it("Should add second post to end of posts array", async () => {
    const newPost = {
      ...basePost,
      carouselTexts: ["four", "five", "six"],
    };

    await act(async () => {
      result.current.addPost(JSON.stringify(basePost));
      result.current.addPost(JSON.stringify(newPost));
    });

    expect(result.current.posts).toEqual([basePost, newPost]);
  });
});

describe("Successfully change caption of current post", () => {
  it("Should add post", async () => {
    await act(async () => {
      result.current.addPost(JSON.stringify(basePost));
    });

    await waitFor(() => {
      expect(result.current.posts).toEqual([basePost]);
    });
  });

  it("Should set selected post to 0", async () => {
    await act(async () => {
      result.current.setSelectedPost(0);
    });

    expect(result.current.selectedPost).toEqual(0);
  });

  it("Should change caption of first and only post", async () => {
    await act(async () => {
      result.current.addPost(JSON.stringify(basePost));
    });
    await act(async () => {
      result.current.setSelectedPost(0);
    });
    await act(async () => {
      result.current.updatePostProperty("different", "caption");
    });

    await waitFor(() => {
      expect(
        result.current.posts![result.current.selectedPost!].caption
      ).toEqual("different");
    });
  });
});
