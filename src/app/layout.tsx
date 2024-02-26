import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  description: 'Метагеномная карта Ростовской области',
  title: 'Метагеномная карта Ростовской области',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
