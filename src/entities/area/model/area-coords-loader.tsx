import { type ReactNode } from 'react';

import type { AreaCoords } from '../types';

import { getAreaCoords, getAreaCoordsWithPhylum } from './actions';

type AreaCoordsLoaderProps = Readonly<{
  children: (areas: AreaCoords[]) => ReactNode;
  phylumId?: number;
}>;

export async function AreaCoordsLoader({
  children,
  phylumId,
}: AreaCoordsLoaderProps) {
  const areaCoords = phylumId
    ? await getAreaCoordsWithPhylum(phylumId)
    : await getAreaCoords();
  return <>{children(areaCoords)}</>;
}
