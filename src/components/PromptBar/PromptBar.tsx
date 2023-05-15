import { Suspense, useContext, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import styled from "styled-components";
import { ClimbingBoxLoader } from "react-spinners";

import { PromptContext } from "@/contexts";
import { Input } from "../FormElements";
import PromptBarButtons from "./PromptBarButtons";
import StyledPromptBarContainer from "./StyledPromptBarContainer";

type IndexState = [number, React.Dispatch<React.SetStateAction<number>>];
interface QuestionnaireProps {
  placeholder: string;
  name: string;
  indexState: IndexState;
}

const StyledMotionWrapper = styled(motion.div)`
  position: absolute;
  left: 0;
  margin: 0 1rem;
  width: calc(100% - 2rem);
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const prompts = [
  {
    title: "What branche is the content for?",
    placeholder: "Online startups",
    name: "branche",
  },
  {
    title: "What topic should the post be about?",
    placeholder: "Founding a business",
    name: "topic",
  },
  {
    title: "What's your Instagram handle? (For generating the caption)",
    placeholder: "@yourInstagramHandle",
    name: "instagram",
  },
];

export type Prompts = typeof prompts;

const loaderVariant = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
} as Variants;

const Questionnaire = (props: QuestionnaireProps) => {
  const { promptData, handlePromptChange, setFinished } = useContext(
    PromptContext
  );
  const { placeholder, name, indexState } = props;
  const [inputIndex, setInputIndex] = indexState;

  const handleNavigation = (step: number) => {
    if (inputIndex < 2) setInputIndex(inputIndex + step);
    else setFinished(true);
  };

  const inputVariant = {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 },
  } as Variants;

  return (
    <div style={{ height: "50px" }}>
      <AnimatePresence>
        <StyledMotionWrapper
          key={name}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={inputVariant}
        >
          <Input
            type="text"
            placeholder={placeholder}
            name={name}
            width="100%"
            padding="1rem"
            onChange={handlePromptChange}
            value={promptData[name] || ""}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            data-testid={`${name}-text-input`}
          />

          <PromptBarButtons
            name={name}
            inputIndex={inputIndex}
            prompts={prompts}
            handleNavigation={handleNavigation}
          />
        </StyledMotionWrapper>
      </AnimatePresence>
    </div>
  );
};

const PromptBar = () => {
  const indexState = useState(0);
  const [inputIndex] = indexState;

  const { title, ...rest } = prompts[inputIndex];

  return (
    <StyledPromptBarContainer>
      <AnimatePresence>
        <Suspense
          fallback={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={loaderVariant}
            >
              <ClimbingBoxLoader speedMultiplier={0.75} color="#ddd" />
            </motion.div>
          }
        >
          <h1 style={{ textAlign: "center" }}>
            Instagram carousel generator 🚀
          </h1>
          <h3 style={{ textAlign: "center" }}>{title}</h3>
          <Questionnaire {...rest} indexState={indexState} />
        </Suspense>
      </AnimatePresence>
    </StyledPromptBarContainer>
  );
};

export default PromptBar;
