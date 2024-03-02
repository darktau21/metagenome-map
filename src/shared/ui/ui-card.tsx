import type { PropsWithChildren } from 'react';

type UICardProps = Readonly<PropsWithChildren>;

export function UICard({ children }: UICardProps) {
  return (
    <div className="col-start-2 col-end-6 py-4 my-4 px-4 border-2 border-solid self-start bg-white shadow-md border-gray-400 rounded-xl">
      {children}
    </div>
  );
}
