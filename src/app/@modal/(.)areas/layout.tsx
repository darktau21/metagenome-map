import type { PropsWithChildren } from 'react';

import { UIModal } from '@/shared/ui';

export default function AreasLayout({ children }: PropsWithChildren) {
  return <UIModal>{children}</UIModal>;
}
