import type { PropsWithChildren } from 'react';

type UITableCellProps = PropsWithChildren;

export function UITableCell({ children }: UITableCellProps) {
  return <td className="p-4">{children}</td>;
}
