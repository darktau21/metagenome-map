'use client';

import { type Variants, motion } from 'framer-motion';
import { TiArrowSortedDown } from 'react-icons/ti';
import { type VariantType } from 'react-tooltip';

import { UITooltip } from '..';
import { SearchStates } from './types';

const TOOLTIP_ID = 'status';

const wrapperVariants: Variants = {
  [SearchStates.NOT_FOUND]: {
    background: 'rgb(225 29 72)',
    opacity: 1,
    paddingTop: '.3rem',
    rotate: '-180deg',
  },
  [SearchStates.RESULTS_FOUND]: {
    background: 'rgb(250 204 21)',
    opacity: 1,
    paddingTop: '.3rem',
    rotate: 0,
  },
  [SearchStates.SELECTED]: {
    background: 'rgb(101 163 13)',
    opacity: 1,
    rotate: '-90deg',
  },
};

type UIArrowProps = Readonly<{
  notFoundTooltipText: string;
  resultsFoundTooltipText: string;
  selectedTooltipText: string;
  status?: SearchStates;
}>;

export function UIArrow({
  notFoundTooltipText,
  resultsFoundTooltipText,
  selectedTooltipText,
  status = SearchStates.NOT_FOUND,
}: UIArrowProps) {
  let tooltipVariant: VariantType;
  let tooltipText;

  switch (status) {
    case SearchStates.NOT_FOUND:
      tooltipVariant = 'error';
      tooltipText = notFoundTooltipText;
      break;
    case SearchStates.RESULTS_FOUND:
      tooltipVariant = 'info';
      tooltipText = resultsFoundTooltipText;
      break;
    case SearchStates.SELECTED:
      tooltipVariant = 'success';
      tooltipText = selectedTooltipText;
      break;
  }

  return (
    <button
      className="absolute right-2 top-0 h-full"
      data-tooltip-class-name="z-[2500]"
      data-tooltip-content={tooltipText}
      data-tooltip-hidden={false}
      data-tooltip-id={TOOLTIP_ID}
      data-tooltip-variant={tooltipVariant}
      disabled={status !== SearchStates.SELECTED}
      type="submit"
    >
      <motion.div
        animate={status}
        className="w-9 h-9 rounded-full"
        initial={SearchStates.NOT_FOUND}
        variants={wrapperVariants}
      >
        <TiArrowSortedDown
          className="w-full h-full"
          color="white"
          fontSize={'2.5rem'}
        />
        <UITooltip id={TOOLTIP_ID} />
      </motion.div>
    </button>
  );
}
