import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

import { Header } from '@/components/header';

import { AuthProvider } from '@/components/auth-provider';
import { Content } from '@/components/content';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import './globals.css';
import { Footer } from '@/components/footer';

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
        <AuthProvider>
          <Header />
          <Content>{children}</Content>
          <Toaster />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
