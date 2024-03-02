import type { PropsWithChildren, ReactNode } from 'react';

import { UIAside } from './ui-aside';

type UILayoutProps = Readonly<
  PropsWithChildren<{
    menu: ReactNode;
  }>
>;

export function UILayout({ children, menu }: UILayoutProps) {
  return (
    <div className="grid grid-cols-[20%,1fr] h-dvh overflow-hidden">
      <UIAside>{menu}</UIAside>
      <main className="col-start-2 col-end-3 bg-gray-50 grid grid-cols-6 overflow-auto gap-4">
        {children}
      </main>
    </div>
  );
}
