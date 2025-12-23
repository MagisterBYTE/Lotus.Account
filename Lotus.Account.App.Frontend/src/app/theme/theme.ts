import { createTheme } from "@mantine/core";
import { ThemeColorVariants } from "lotus-ui-react/theme";

export const theme = createTheme({
  /** Put your mantine theme override here */
  fontFamily: 'Verdana',
  colors: {
    // Primary - синяя палитра MUI
    primary: ThemeColorVariants.Primary.toArrayCss(false),
    secondary: ThemeColorVariants.Secondary.toArrayCss(false),
    error: ThemeColorVariants.Error.toArrayCss(false),
    warning: ThemeColorVariants.Warning.toArrayCss(false),
    info: ThemeColorVariants.Info.toArrayCss(false),
    success: ThemeColorVariants.Success.toArrayCss(false),
    blue: ThemeColorVariants.MuiBlue.toArrayCss(false),
    blueGray: ThemeColorVariants.MuiBlueGrey.toArrayCss(false),
    indigo: ThemeColorVariants.MuiIndigo.toArrayCss(false),
    green: ThemeColorVariants.MuiGreen.toArrayCss(false),
    teal: ThemeColorVariants.MuiTeal.toArrayCss(false),
    yellow: ThemeColorVariants.MuiYellow.toArrayCss(false),
    amber: ThemeColorVariants.MuiAmber.toArrayCss(false),
    red: ThemeColorVariants.MuiRed.toArrayCss(false),
    brown: ThemeColorVariants.MuiBrown.toArrayCss(false),
    gray: ThemeColorVariants.MuiGray.toArrayCss(false),
  },
  
  primaryColor: 'primary',
  primaryShade: 5, // Используем основной оттенок (index 5)
});
