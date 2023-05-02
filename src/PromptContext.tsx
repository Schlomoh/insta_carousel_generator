import { ReactNode, createContext, useState } from "react";

interface ProviderProps {
  children: ReactNode;
}

export interface PromptData {
  [key: string]: string;
  branche: string;
  topic: string;
  instagram: string;
}

export const PromptContext = createContext(
  {} as ReturnType<typeof usePromptState>
);

const usePromptState = () => {
  const [promptData, setPromptData] = useState<PromptData>({
    branche: "",
    topic: "",
    instagram: "",
  });
  const [finished, setFinished] = useState(false);

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
