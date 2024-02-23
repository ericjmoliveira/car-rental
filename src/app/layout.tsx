import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

import { Header } from '@/components/header';

import { cn } from '@/lib/utils';
import './globals.css';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'Car Rental'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <Header />
        {children}
      </body>
    </html>
  );
}
