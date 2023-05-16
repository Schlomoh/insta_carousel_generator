import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, it } from "vitest";
import useFetchOpenAiData from "../useFetchOpenAiData";
import { Suspense } from "react";
import { openAiResponse } from "tests/setup";

const promptData = {
  branche: "test",
  topic: "test",
  instagram: "test",
};

describe("Successfully handle openAI api response from msw", () => {
  it("Should fetch the data and respond with OpenAiResponse object"),
    async () => {
      const {
        result: { current },
      } = renderHook(() => useFetchOpenAiData(promptData, true), {
        wrapper: Suspense,
      });

      await waitFor(() => {
        expect(current).toBe(openAiResponse);
      });
    };
});
