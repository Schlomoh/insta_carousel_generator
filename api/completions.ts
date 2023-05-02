export const config = {
  runtime: "edge",
};

export default async (request: Request) => {
  const response = await fetch(`${process.env.OPENAI_CHAT_URL}/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify(await request.json()),
  });

  return response;
};
