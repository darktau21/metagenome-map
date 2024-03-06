'use client';

import clsx from 'clsx';
import { type PropsWithChildren } from 'react';

type UIHeadingProps = Readonly<
  PropsWithChildren<{
    as?: 'h1' | 'h2' | 'h3';
    classNames?: string;
  }>
>;

export function UIHeading({ as = 'h1', children, classNames }: UIHeadingProps) {
  const classes = 'py-2 text-xl';

  switch (as) {
    case 'h1':
      return (
        <h1 className={clsx(classes, 'font-bold', classNames)}>{children}</h1>
      );
    case 'h2':
      return (
        <h2 className={clsx(classes, 'font-semibold', classNames)}>
          {children}
        </h2>
      );
    case 'h3':
      return (
        <h3 className={clsx(classes, 'font-medium', classNames)}>{children}</h3>
      );
  }
}
