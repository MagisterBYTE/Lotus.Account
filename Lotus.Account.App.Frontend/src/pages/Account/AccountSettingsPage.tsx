import { useMantineColorScheme, type MantineColorScheme } from "@mantine/core";
import { LanguageTypeOptions, LocalizationCoreDispatcher } from "lotus-core/localization";
import { SegmentedField, SelectField } from "lotus-ui-react/components/Controls";
import { Box, VerticalStack } from "lotus-ui-react/components/Layout";
import { ThemeColorModeOptions, type TThemeColorMode } from "lotus-ui-react/theme";
import React from "react";

export const AccountSettingsPage: React.FC = () =>
{
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const handleColorSchemeChange = (value: TThemeColorMode | undefined) =>
  {
    setColorScheme(value as MantineColorScheme);
  }

  return (
    <Box centerContent='center'>
      <VerticalStack spacing={"md"} p="lg" m="lg" borderRadius w="min(600px, 80vw)" hAlign="stretch">
        <SegmentedField inlinePlace label={"Тема"} labelProps={{ w: '160px' }} options={ThemeColorModeOptions}
          value={colorScheme as TThemeColorMode}
          onChanged={handleColorSchemeChange}
        />
        <SelectField inlinePlace label={"Язык"} labelProps={{ w: '160px' }}
          value={LocalizationCoreDispatcher.currentLanguage}
          options={LanguageTypeOptions} onChanged={LocalizationCoreDispatcher.setLanguage} />
      </VerticalStack>
    </Box>
  );
};
