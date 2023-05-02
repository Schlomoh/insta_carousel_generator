function wrapPromise<T>(func: () => Promise<T>) {
  let status = "pending";
  let result: T | undefined;

  const suspender = func().then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    }
  );

  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      }
      return result;
    },
    suspender,
  };
}

export default wrapPromise;
