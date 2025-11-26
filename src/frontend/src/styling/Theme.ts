'use client';

import { createTheme } from '@mui/material/styles';
import { MuiButton } from '@/styling/components/MuiButton';
import { darkColorScheme, lightColorScheme } from '@/styling/ColorSchemes';

const theme = createTheme({
  colorSchemes: {
    dark: darkColorScheme,
    light: lightColorScheme,
  },
  components: {
    MuiButton: MuiButton,
  },
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
});

export default theme;
