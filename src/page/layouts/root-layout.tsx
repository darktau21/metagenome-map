import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { UILayout } from '@/shared/ui';
import { NavMenu } from '@/widgets/nav-menu';
import { Inter } from 'next/font/google';
import 'react-loading-skeleton/dist/skeleton.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  description: 'Метагеномная карта Ростовской области',
  title: 'Метагеномная карта Ростовской области',
};

export function RootLayout({
  children,
  modal,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.className} antialiased overflow-hidden`}>
        <UILayout menu={<NavMenu />}>{children}</UILayout>
        {modal}
        <div id="modal-container" />
      </body>
    </html>
  );
}
