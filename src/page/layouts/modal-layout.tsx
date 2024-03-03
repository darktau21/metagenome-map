import type { PropsWithChildren } from 'react';

import { UIModal } from '@/shared/ui';

export function ModalLayout({ children }: PropsWithChildren) {
  return <UIModal>{children}</UIModal>;
}
