import wrapPromise from "@/openAiRequest/wrapPromise";

describe("wrapPromise", () => {
  it("should handle pending state correctly", () => {
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve("resolved");
      }, 1000);
    });
    const wrappedPromise = wrapPromise(() => promise);

    expect(() => wrappedPromise.read()).toThrow();
  });

  it("should handle success state correctly", async () => {
    const mockData = "mocked data";
    const promise = Promise.resolve(mockData);
    const wrappedPromise = wrapPromise(() => promise);

    await wrappedPromise.suspender;
    expect(wrappedPromise.read()).toBe(mockData);
  });

  it('should handle error state correctly', async () => {
    const errorMessage = 'error occurred';
    const promise = Promise.reject(errorMessage);
    const wrappedPromise = wrapPromise(() => promise);
  
    try {
      await wrappedPromise.suspender;  // Wait for the promise to resolve
      wrappedPromise.read();  // This should throw an error
      fail('Expected an error to be thrown');  // This will fail the test if no error is thrown
    } catch (e) {
      expect(e).toBe(errorMessage);  // This will verify that the error thrown is the expected one
    }
  });
  
});
