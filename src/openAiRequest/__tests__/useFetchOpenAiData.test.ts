import { renderHook, waitFor } from "@testing-library/react";
import { PromptData } from "@/contexts";
import {
  useFetchOpenAiData,
  createGptPrompt,
  fetchData,
} from "@/openAiRequest";

const dummyPromptData: PromptData = {
  branche: "tech",
  topic: "AI",
  instagram: "openai",
};

describe("createGptPrompt", () => {
  it("should create a valid prompt string", () => {
    const prompt = createGptPrompt(dummyPromptData);
    expect(prompt).toContain("tech");
    expect(prompt).toContain("AI");
    expect(prompt).toContain("openai");
  });
});

describe("fetchData", () => {
  it("should successfully fetch data", async () => {
    const response = (await fetchData(dummyPromptData)) as any;
    expect(response.data).toEqual("mocked data");
  });
});

describe("useFetchOpenAiData", () => {
  it("should return data after completion", async () => {
    const { result } = renderHook(() =>
      useFetchOpenAiData(dummyPromptData, true)
    );

    await waitFor(() => expect(result.current).toEqual({ data: 'mocked data' }));
  });
});
