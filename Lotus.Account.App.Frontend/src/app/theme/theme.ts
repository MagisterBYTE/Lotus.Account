import { createTheme } from '@mantine/core';
import { ColorCssPaletteVariants } from 'lotus-core/modules/color';

export const theme = createTheme({
  /** Put your mantine theme override here */
  fontFamily: 'Verdana',
  colors: ColorCssPaletteVariants.Light,
  primaryColor: 'primary',
  primaryShade: 5 // Используем основной оттенок (index 5)
});
