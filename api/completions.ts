export const config = {
  runtime: "edge",
};

export default async (request: Request) => {
  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      body: await request.json(),
    }),
  });

  return response;
};
