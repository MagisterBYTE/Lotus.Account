// types/mantine.d.ts
import '@mantine/core';

type ExtendedCustomColors = 
  | 'primary' 
  | 'secondary' 
  | 'error' 
  | 'warning' 
  | 'info' 
  | 'success'
  | keyof MantineDefaultColors; // Добавляем стандартные цвета Mantine

declare module '@mantine/core' {
  export interface MantineThemeColors {
    primary: MantineThemeColors[number];
    secondary: MantineThemeColors[number];
    error: MantineThemeColors[number];
    warning: MantineThemeColors[number];
    info: MantineThemeColors[number];
    success: MantineThemeColors[number];
  }
  
  export interface MantineThemeOther {
    // Можно добавить другие кастомные свойства если нужно
  }
}

// Дополнительно для автодополнения
declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
  }
}