import type { PropsWithChildren } from 'react';

type UIVerticalMenu = Readonly<PropsWithChildren>;

export function UIAside({ children }: UIVerticalMenu) {
  return (
    <aside className="h-full bg-gray-100 border-r-2 border-r-gray-400 border-solid flex flex-col gap-4 items-stretch">
      {children}
    </aside>
  );
}
