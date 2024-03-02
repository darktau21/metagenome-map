'use server';

import { type ReactNode } from 'react';

import type { AreaCoords } from '../types';

import { getAreaCoords } from './actions';

type AreaCoordsLoaderProps = Readonly<{
  children: (areas: AreaCoords[]) => ReactNode;
}>;

export async function AreaCoordsLoader({ children }: AreaCoordsLoaderProps) {
  const areaCoords = await getAreaCoords();
  return <>{children(areaCoords)}</>;
}
