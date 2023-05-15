import { renderHook, waitFor } from "@testing-library/react";
import { useCanvasState } from "@/contexts";

test("Successfully updating textColor", async () => {
  const { result } = renderHook(() => useCanvasState());
  expect(result.current.textColor).toEqual({ r: 0, g: 0, b: 0 });

  const color = { r: 50, g: 50, b: 50 };
  result.current.updateTextColor(color);
  await waitFor(() => expect(result.current.textColor).toBe(color));
});

test("Successfully updating background color", async () => {
  const { result } = renderHook(() => useCanvasState());
  expect(result.current.backgroundColor).toEqual({ r: 255, g: 255, b: 255 });

  const color = { r: 50, g: 50, b: 50 };
  result.current.updateBackgroundColor(color);
  await waitFor(() => expect(result.current.backgroundColor).toBe(color));
});

test("Successfully updating title background color", async () => {
  const { result } = renderHook(() => useCanvasState());
  expect(result.current.titleBackgroundColor).toEqual({
    r: 210,
    g: 210,
    b: 210,
  });

  const color = { r: 50, g: 50, b: 50 };
  result.current.updateTitleBackgroundColor(color);
  await waitFor(() => expect(result.current.titleBackgroundColor).toBe(color));
});

test("Successfully updating canvas size", async () => {
  const { result } = renderHook(() => useCanvasState());
  expect(result.current.canvasWidth).toEqual(1080);
  expect(result.current.canvasHeight).toEqual(1200);

  result.current.resize(500, 500);
  await waitFor(() => expect(result.current.canvasWidth).toBe(500));
  await waitFor(() => expect(result.current.canvasHeight).toBe(500));
});

test("Successfully updating scale factor", async () => {
  const { result } = renderHook(() => useCanvasState());
  expect(result.current.scaleFactor).toEqual(0.45);

  result.current.zoom(0.25);
  await waitFor(() => expect(result.current.scaleFactor).toBe(0.25));
});
