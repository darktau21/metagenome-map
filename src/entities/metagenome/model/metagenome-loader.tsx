import type { ReactNode } from 'react';

import type { MetagenomeValue } from '../types';

import { getMetagenome } from '..';

type MetagenomeLoaderProps = Readonly<{
  areaId: number;
  children: (metagenome: MetagenomeValue[]) => ReactNode;
}>;

export async function MetagenomeLoader({
  areaId,
  children,
}: MetagenomeLoaderProps) {
  const metagenome = await getMetagenome(areaId);
  return <>{children(metagenome)}</>;
}
