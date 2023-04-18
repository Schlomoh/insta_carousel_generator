import { motion } from "framer-motion";
import styled from "styled-components";

const Form = styled(motion.form)<{ show?: boolean }>`
  /* display: ${({ show }) => (show ? "flex" : "none")}; */
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: hidden;
`;

export default Form;
