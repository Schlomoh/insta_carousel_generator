import { PromptContext, PromptData } from "@/PromptContext";
import { useContext, useRef } from "react";
import { useState, useEffect } from "react";

import wrapPromise from "./wrapPromise";
import { OpenAiResponse } from "./OpenAiTypes";

const fetchData = async (promptData: PromptData): Promise<OpenAiResponse> => {
  const url = "/completions";

  const prompt = `As an expert on social media marketing, generate a JSON object 
  containing Instagram carousel posts for the ${promptData.branche} niche, 
  following the TypeScript structure provided. Come up with an almost 
  click baiting, catchy and engaging title. Use the title as the 
  first 'carouselText'. The next 8 'carouselTexts' should give specific 
  tips on the topic of ${promptData.topic} but must not be longer than 
  one sentence. The last slide is a CTA encouraging people to like, 
  comment and share the post. It is important to include emojis in all 
  of the carousel texts. Come up with a captivating caption, and 5 
  relevant hashtags. Exclude hashtags from the caption. The Instagram 
  profile is ${promptData.instagram}. Omit the 'titleImageSrc' field.

  Example structure:  {
  "carouselTexts": [
  *title**emoji*,
  *info 1**emoji*,
  *info 2**emoji*,
  *info 3**emoji*,
  *info 4**emoji*,
  *info 5**emoji*,
  *info 6**emoji*,
  *info 7**emoji*,
  *info 8**emoji*,
  *call to action (like, comment, share)*
  ],
  "caption": *caption*,
  "hashtags": [*hashtag1*, *hashtag2*, *hashtag3*, *hashtag4*, *hashtag5*]
  
  Here's the TypeScript structure for reference:
  interface PostData {
    titleImageSrc?: string;
    carouselTexts: string[];
    caption: string;
    hashtags: string[];
  }
  do not add unicode escape characters.
  only return the json data as a plain text. nothing else.`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      contentType: "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  return await response.json();
};

interface ResourceState {
  read: () => OpenAiResponse | undefined;
}

const isDev = import.meta.env.DEV;

export const useFetchOpenAiData = (
  promptData: PromptData,
  isFinished: boolean
) => {
  const [resource, setResource] = useState<ResourceState | null>(null);
  const prevIsFinishedRef = useRef<boolean | null>(isDev || null);

  useEffect(() => {
    const prevIsFinished = prevIsFinishedRef.current;
    prevIsFinishedRef.current = isFinished;

    if (!prevIsFinished && isFinished) {
      const fetchDataResource = wrapPromise(() => fetchData(promptData));
      setResource(fetchDataResource);
    }
  }, [JSON.stringify(promptData), isFinished]);

  return resource?.read();
};

export default useFetchOpenAiData;
