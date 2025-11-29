'use client';

import { CssBaseline } from '@mui/material';
import { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import theme from '@/styling/Theme';
import { ReactQueryProvider } from '@/components/ReactQueryProvider/ReactQueryProvider';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
