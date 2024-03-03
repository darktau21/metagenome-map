'use server';

import { type ReactNode } from 'react';

import type { SampleCoords } from '../types';

import { getSamplesCoords } from './actions';

type SamplesCoordsLoaderProps = Readonly<{
  children: (areas: SampleCoords[]) => ReactNode;
}>;

export async function SamplesCoordsLoader({ children }: SamplesCoordsLoaderProps) {
  const samplesCoords = await getSamplesCoords();
  return <>{children(samplesCoords)}</>;
}
