'use client';

import type { PropsWithChildren, ReactNode } from 'react';

import { motion } from 'framer-motion';

type UINavMenuProps = Readonly<PropsWithChildren>;

export function UINavMenu({ children }: UINavMenuProps) {
  return (
    <nav className="bg-slate-800">
      <ul className="flex items-stretch justify-center gap-4 py-4">
        {children}
      </ul>
    </nav>
  );
}

type UINavMenuItemProps = Readonly<PropsWithChildren>;

export function UINavMenuItem({ children }: UINavMenuItemProps) {
  return (
    <motion.li
      whileHover={{
        scale: 1.1,
      }}
    >
      {children}
    </motion.li>
  );
}
