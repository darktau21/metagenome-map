import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { UILayout } from '@/shared/ui';
import { NavMenu } from '@/widgets/nav-menu';
import { Inter } from 'next/font/google';
import 'react-loading-skeleton/dist/skeleton.css';

import './globals.css';

export { RootLayout as default } from '@/page/layouts';
