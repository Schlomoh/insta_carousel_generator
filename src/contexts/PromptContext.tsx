import { ReactNode, createContext, useState } from "react";

interface ProviderProps {
  children: ReactNode;
}

export interface PromptData {
  [key: string]: string | null;
  branche: string | null;
  topic: string | null;
  instagram: string | null;
}

export const PromptContext = createContext(
  {} as ReturnType<typeof usePromptState>
);

const useDummyData = import.meta.env.VITE_USE_DUMMY_DATA === "true";
const isDev = import.meta.env.DEV && useDummyData;

export const usePromptState = () => {
  const [promptData, setPromptData] = useState<PromptData>({
    branche: null,
    topic: null,
    instagram: null,
  });
  const [finished, setFinished] = useState<boolean>(isDev);

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPromptData((prev) => ({ ...prev, [name]: value }));
  };

  return {
    promptData,
    finished,
    setFinished,
    handlePromptChange,
  };
};

const PromptContextProvider = ({ children }: ProviderProps) => {
  const promptState = usePromptState();

  return (
    <PromptContext.Provider value={promptState}>
      {children}
    </PromptContext.Provider>
  );
};

export default PromptContextProvider;
