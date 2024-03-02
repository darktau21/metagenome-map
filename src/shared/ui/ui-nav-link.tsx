import type { PropsWithChildren } from 'react';

import clsx from 'clsx';
import Link from 'next/link';

type UINavLinkProps = Readonly<
  PropsWithChildren<{
    href: string;
    isActive?: boolean;
  }>
>;

export function UINavLink({
  children,
  href,
  isActive = false,
}: UINavLinkProps) {
  return (
    <Link
      className={clsx(
        'flex items-center text-gra text-base py-1 px-3 rounded text-slate-400 font-bold transition-colors',
        { 'text-slate-50': isActive },
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
