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
      {menu}
      <main className="col-start-2 col-end-3 overflow-y-auto grid grid-cols-6 bg-gray-50">
        {children}
      </main>
    </div>
  );
}
