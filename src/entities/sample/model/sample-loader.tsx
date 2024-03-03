import type { ReactNode } from 'react';

import { notFound } from 'next/navigation';

import { type Sample, getSample } from '..';

type SampleLoaderProps = Readonly<{
  children: (sample: Sample) => ReactNode;
  id: number;
}>;

export async function SampleLoader({ children, id }: SampleLoaderProps) {
  const sample = await getSample(id);

  if (!sample) {
    return notFound();
  }

  return <>{children(sample)}</>;
}
