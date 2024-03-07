'use client';

import type { MouseEventHandler, PropsWithChildren } from 'react';

import clsx from 'clsx';
import { motion } from 'framer-motion';

type UITipsItem = Readonly<
  PropsWithChildren<{
    className?: string;
    onClick?: MouseEventHandler;
  }>
>;

export function UITipsItem({ children, className, onClick }: UITipsItem) {
  return (
    <motion.li
      className={clsx(
        'px-4 py-2 outline-none max-w-full hover:bg-slate-200 focus-visible:bg-slate-200 transition-colors',
        className,
      )}
      initial={{ opacity: 0 }}
      onClick={onClick}
      tabIndex={-1}
      viewport={{ margin: '30%' }}
      whileFocus={{
        scale: 1.05,
      }}
      whileHover={{
        scale: 1.05,
      }}
      whileInView={{
        opacity: 1,
      }}
    >
      {children}
    </motion.li>
  );
}
