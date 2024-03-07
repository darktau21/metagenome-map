import type { ReactNode } from 'react';

import type { Phylum } from '../types';

import { getPhylumList } from '..';

type PhylumListLoaderProps = Readonly<{
  children: (phylums: Phylum[]) => ReactNode;
}>;

export async function PhylumListLoader({ children }: PhylumListLoaderProps) {
  const phylums = await getPhylumList();

  return <>{children(phylums)}</>;
}
