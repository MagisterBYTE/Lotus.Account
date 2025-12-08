import { createTheme } from "@mantine/core";

export const theme = createTheme({
  /** Put your mantine theme override here */
  fontFamily: 'Verdana',
  colors: {
    // Primary - синяя палитра MUI
    primary: [
      '#e3f2fd', // 0
      '#bbdefb', // 1
      '#90caf9', // 2
      '#64b5f6', // 3
      '#42a5f5', // 4
      '#2196f3', // 5 - основной
      '#1e88e5', // 6
      '#1976d2', // 7
      '#1565c0', // 8
      '#0d47a1', // 9
    ],
    
    // Secondary - фиолетовая палитра MUI
    secondary: [
      '#f3e5f5', // 0
      '#e1bee7', // 1
      '#ce93d8', // 2
      '#ba68c8', // 3
      '#ab47bc', // 4
      '#9c27b0', // 5 - основной
      '#8e24aa', // 6
      '#7b1fa2', // 7
      '#6a1b9a', // 8
      '#4a148c', // 9
    ],
    
    // Error - красная палитра MUI
    error: [
      '#ffebee', // 0
      '#ffcdd2', // 1
      '#ef9a9a', // 2
      '#e57373', // 3
      '#ef5350', // 4
      '#f44336', // 5 - основной
      '#e53935', // 6
      '#d32f2f', // 7
      '#c62828', // 8
      '#b71c1c', // 9
    ],
    
    // Warning - оранжевая палитра MUI
    warning: [
      '#fff3e0', // 0
      '#ffe0b2', // 1
      '#ffcc80', // 2
      '#ffb74d', // 3
      '#ffa726', // 4
      '#ff9800', // 5 - основной
      '#fb8c00', // 6
      '#f57c00', // 7
      '#ef6c00', // 8
      '#e65100', // 9
    ],
    
    // Info - голубая палитра MUI
    info: [
      '#e1f5fe', // 0
      '#b3e5fc', // 1
      '#81d4fa', // 2
      '#4fc3f7', // 3
      '#29b6f6', // 4
      '#03a8f49d', // 5 - основной
      '#039be5', // 6
      '#0288d1', // 7
      '#0277bd', // 8
      '#01579b', // 9
    ],
    
    // Success - зеленая палитра MUI
    success: [
      '#e8f5e8', // 0
      '#c8e6c9', // 1
      '#a5d6a7', // 2
      '#81c784', // 3
      '#66bb6a', // 4
      '#4caf50', // 5 - основной
      '#43a047', // 6
      '#388e3c', // 7
      '#2e7d32', // 8
      '#1b5e20', // 9
    ],
  },
  
  primaryColor: 'primary',
  primaryShade: 5, // Используем основной оттенок (index 5)
});
