import { ReactNode, RefObject, useEffect, useId, useRef } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

interface PopoverProps {
  children?: ReactNode;
  show: boolean;
  onClose: () => void;
  trigger: RefObject<HTMLElement>;
}

const StyledPopover = styled(motion.div)`
  position: absolute;
  top: 0;
  width: calc(300px);
  padding: 1rem;
  border-radius: 10px;
  background-color: #2f2f2f;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const useClickOutside = (
  ref: RefObject<HTMLElement>,
  trigger: RefObject<HTMLElement>,
  handler: () => void
) => {
  useEffect(() => {
    const handleMouseDown = (e: PointerEvent) => {
      const { current: popover } = ref;
      const { target } = e as PointerEvent & { target: Node };
      const clickedTrigger = e.target === trigger.current;
      const clickedPopover = popover && popover.contains(target);

      if (target && popover && !clickedPopover && !clickedTrigger) handler();
    };

    document.addEventListener("pointerdown", handleMouseDown);
    return () => document.removeEventListener("pointerdown", handleMouseDown);
  }, [ref, handler]);
};

const Popover = ({ show, onClose, children, trigger }: PopoverProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  useClickOutside(ref, trigger, onClose);

  const popoverAnimation = {
    initial: { left: 300, opacity: 0 },
    animate: { left: 348, opacity: 1 },
    exit: { left: 300, opacity: 0 },
  };

  return show ? (
    <StyledPopover key={id} {...popoverAnimation} ref={ref}>
      {children}
    </StyledPopover>
  ) : null;
};

export default Popover;
