import type { ReactNode } from 'react';

import { notFound } from 'next/navigation';

import type { Area } from '../types';

import { getArea, getDuplicatedCoordsArea } from './actions';

type AreaLoaderProps = Readonly<{
  children: (area: Area, duplicates: Area[] | null) => ReactNode;
  id: number;
}>;

export async function AreaLoader({ children, id }: AreaLoaderProps) {
  const area = await getArea(id);

  if (!area) {
    return notFound();
  }

  const duplicates = await getDuplicatedCoordsArea(id);

  return <>{children(area, duplicates)}</>;
}
