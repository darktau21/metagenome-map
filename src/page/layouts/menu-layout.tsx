import type { PropsWithChildren } from 'react';

import { UIAside } from '@/shared/ui';
import { NavMenu } from '@/widgets/nav-menu';

type MenuLayoutProps = Readonly<PropsWithChildren>;

export function MenuLayout({ children }: MenuLayoutProps) {
  return (
    <UIAside>
      <NavMenu />
      {children}
    </UIAside>
  );
}
