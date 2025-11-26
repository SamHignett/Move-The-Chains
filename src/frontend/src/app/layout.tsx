import './globals.css';
import { Roboto } from 'next/font/google';
import { QueryProvider } from '@/components/QueryProvider/QueryProvider';
import { NavBar } from '@/components/NavBar/NavBar';
import { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/styling/Theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { CssBaseline } from '@mui/material';
import { Metadata } from 'next';

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
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <QueryProvider>
              <NavBar />
              {children}
            </QueryProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
