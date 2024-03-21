import type { PropsWithChildren } from 'react';

type UITableRowProps = PropsWithChildren;

export function UITableRow({ children }: UITableRowProps) {
  return <tr className="even:bg-gray-200">{children}</tr>;
}
