import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import { rest } from "msw";
// extends Vitest's expect method with methods from react-testing-library
beforeAll(() => {
  expect.extend(matchers);
});

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

export const openAiResponse = {
  id: "chatcmpl-7GcnkbhgvqZSQ1qAUIPBq1DB2NDNa",
  object: "chat.completion",
  created: 1684196756,
  model: "gpt-3.5-turbo-0301",
  usage: {
    prompt_tokens: 383,
    completion_tokens: 204,
    total_tokens: 587,
  },
  choices: [
    {
      message: {
        role: "assistant",
        content:
          '{\n  "carouselTexts": [\n    "10 Mind-Blowing Test Hacks You Must Know 💥",\n    "Create targeted test campaigns 🎯",\n    "Leverage user-generated content for increased engagement 📸",\n    "Use Instagram Stories to showcase your products 📱",\n    "Collaborate with influencers in your niche 🤝",\n    "Create captivating captions with emojis 📝",\n    "Engage with your followers by responding to comments and DMs 💬",\n    "Schedule your posts for optimal engagement 📅",\n    "Track your analytics to measure success 📈",\n    "Don\'t forget to like, comment and share! 🙌"\n  ],\n  "caption": "Get ready to step up your Instagram game with these test tips! 🚀 #test #marketing #socialmedia #digitalmarketing #instagramtips",\n  "hashtags": ["test", "marketing", "socialmedia", "digitalmarketing", "instagramtips"]\n}',
      },
      finish_reason: "stop",
      index: 0,
    },
  ],
};

export const restHandlers = [
  rest.post("https://api.openai.com/v1/chat/completions", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(openAiResponse));
  }),
];
