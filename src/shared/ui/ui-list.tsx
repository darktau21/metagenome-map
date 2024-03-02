import type { PropsWithChildren } from 'react';

type UIListProps = Readonly<PropsWithChildren>;

export function UIList({ children }: UIListProps) {
  return <ul className="flex flex-col gap-2 text-base">{children}</ul>;
}

type UIListItemProps = Readonly<PropsWithChildren>;

export function UIListItem({ children }: UIListItemProps) {
  return <li>{children}</li>;
}
