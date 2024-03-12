import type { PromiseReturnType } from '@prisma/client/extension';
import type { ReactNode } from 'react';

import { getMinMaxPhylumValues } from '..';

type MinMaxPhylumLoaderProps = Readonly<{
  children: (
    data: PromiseReturnType<typeof getMinMaxPhylumValues>,
  ) => ReactNode;
  phylumId: number;
}>;

export async function MinMaxPhylumLoader({
  children,
  phylumId,
}: MinMaxPhylumLoaderProps) {
  const minMax = await getMinMaxPhylumValues(phylumId);
  return <>{children(minMax)}</>;
}
