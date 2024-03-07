'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Tooltip } from 'react-tooltip';

import { MODAL_CONTAINER_ID } from '../constants';

type UITooltipProps = Readonly<{
  id: string;
}>;

export function UITooltip({ id }: UITooltipProps) {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {isMounted &&
        createPortal(
          <Tooltip id={id} />,
          document.getElementById(MODAL_CONTAINER_ID)!,
        )}
    </>
  );
}
