import { renderHook, act, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import PromptContextProvider, { usePromptState } from "../PromptContext";
import { ChangeEvent } from "react";

const setup = () => {
  return renderHook(() => usePromptState(), {
    wrapper: PromptContextProvider,
  }).result;
};
let result: ReturnType<typeof setup>;

beforeEach(() => {
  result = setup();
});

const data = [
  { name: "branche", value: "test" },
  { name: "topic", value: "test" },
  { name: "instagram", value: "test" },
];

const promptData = {
  branche: "test",
  topic: "test",
  instagram: "test",
};

const createEvent = (index: number) => {
  return ({ target: data[index] } as any) as ChangeEvent<HTMLInputElement>;
};

describe("Successfully add prompt data to context", () => {
  it("Should add prompt data sequentially", async () => {
    await act(async () => {
      result.current.handlePromptChange(createEvent(0));
    });
    await act(async () => {
      result.current.handlePromptChange(createEvent(1));
    });
    await act(async () => {
      result.current.handlePromptChange(createEvent(2));
    });

    await waitFor(() => {
      expect(result.current.promptData).toEqual(promptData);
    });
  });
});
