import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { MODAL_CONTAINER_ID } from '@/shared/constants';
import { UILayout } from '@/shared/ui';
import { Inter } from 'next/font/google';
import 'react-loading-skeleton/dist/skeleton.css';

import { MenuLayout } from './menu-layout';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  description: 'Метагеномная карта Ростовской области',
  title: 'Метагеномная карта Ростовской области',
};

export function RootLayout({
  children,
  menu,
  modal,
}: Readonly<{
  children: ReactNode;
  menu: ReactNode;
  modal: ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.className} antialiased`}>
        <UILayout menu={<MenuLayout>{menu}</MenuLayout>}>{children}</UILayout>
        <div id={MODAL_CONTAINER_ID}>{modal}</div>
      </body>
    </html>
  );
}
