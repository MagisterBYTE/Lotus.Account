import { DefaultMantineColor, MantineColorsTuple } from "@mantine/core";

type TColorSemanticColors =  "primary" | "secondary" | "error" | "warning" | "info" | "success";

type ExtendedCustomColors = "blue" | "blueGray" | "indigo" | "green" | "teal" | "yellow" | "amber" | "red" | "brown" | "gray";

type AllCustomColors = TColorSemanticColors | ExtendedCustomColors | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<AllCustomColors, MantineColorsTuple>;
  }
}
