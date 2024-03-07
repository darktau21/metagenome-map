'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { type PropsWithChildren, type ReactNode, forwardRef } from 'react';

import type { SearchStates } from './types';

type TipsListProps = Readonly<
  PropsWithChildren<{
    isLoading?: boolean;
    isShown?: boolean;
    loadingPlaceholder: ReactNode;
    notFoundPlaceholder: ReactNode;
    searchState: SearchStates;
  }>
>;

const initialView = { height: 0, opacity: 0 };
const animate = { height: '11rem', opacity: 1 };

export const UITipsList = forwardRef<HTMLUListElement, TipsListProps>(
  function UITipsList(
    {
      children,
      isLoading = true,
      isShown = false,
      loadingPlaceholder,
      notFoundPlaceholder,
      searchState,
    },
    tipsRef,
  ) {
    return (
      <AnimatePresence>
        {isShown && searchState !== 'selected' ? (
          <motion.div
            animate={animate}
            className="absolute overflow-hidden bg-white shadow-lg w-full top-full left-0 rounded"
            exit={initialView}
            initial={initialView}
          >
            <ul
              className="flex flex-col max-h-full scrollbar-thin divide-y-2 overflow-x-hidden cursor-pointer overflow-y-auto"
              ref={tipsRef}
            >
              {isLoading ? loadingPlaceholder : null}
              {!isLoading && searchState === 'resultsFound' ? children : null}
              {!isLoading && searchState === 'notFound'
                ? notFoundPlaceholder
                : null}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    );
  },
);
