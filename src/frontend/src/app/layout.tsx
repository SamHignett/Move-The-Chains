import './globals.css';
import { Roboto } from 'next/font/google';
import { NavBar } from '@/components/NavBar/NavBar';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import Providers from '@/app/providers';

const roboto = Roboto({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['300', '400', '500', '700'],
});

export const metadata: Metadata = {
  description:
    'An NFL-related website for tracking stats, making predictions and more.',
  title: 'Move The Chains',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
