import type { PropsWithChildren, ReactNode } from 'react';

type UITableProps = PropsWithChildren<{
  heading: ReactNode;
}>;

export function UITable({ children, heading }: UITableProps) {
  return (
    <table>
      <thead className=" px-2 py-4 border-b-slate-400 border-b-2 p-2 text-xl font-semibold">
        {heading}
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
