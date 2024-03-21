'use client';
import { AnimatePresence, type Variants, motion } from 'framer-motion';
import { type PropsWithChildren, type ReactNode, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

type UIAccordionProps = Readonly<
  PropsWithChildren<{
    isOpen?: boolean;
    title: ReactNode;
  }>
>;

const accordionVariants: Variants = {
  closed: { height: 0 },
  opened: { height: 'auto' },
};

const arrowVariants: Variants = {
  closed: { rotate: 0 },
  opened: { rotate: '180deg' },
};

export function UIAccordion({
  children,
  isOpen = false,
  title,
}: UIAccordionProps) {
  const [isOpened, setIsOpened] = useState<boolean>(isOpen);

  const handleClick = () => setIsOpened((prev) => !prev);

  const variant = isOpened ? 'opened' : 'closed';

  return (
    <div className="border border-slate-300 rounded">
      <div
        className="flex justify-between cursor-pointer items-center bg-slate-300 px-2 py-1"
        onClick={handleClick}
      >
        {title}
        <motion.span animate={variant} variants={arrowVariants}>
          <MdKeyboardArrowDown size={'2rem'} />
        </motion.span>
      </div>
      <motion.div
        animate={variant}
        className="overflow-hidden px-4"
        exit={variant}
        initial={variant}
        variants={accordionVariants}
      >
        <AnimatePresence>{isOpened ? children : null}</AnimatePresence>
      </motion.div>
    </div>
  );
}
