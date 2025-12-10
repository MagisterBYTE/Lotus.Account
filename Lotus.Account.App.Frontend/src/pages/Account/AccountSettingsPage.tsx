import { useMantineColorScheme, type MantineColorScheme } from "@mantine/core";
import { LanguageTypeOptions, type TLanguageType } from "lotus-core/localization";
import { SegmentedField, SelectField } from "lotus-ui-react/components/Controls";
import { Box, VerticalStack } from "lotus-ui-react/components/Layout";
import { ThemeColorModeOptions, type TThemeColorMode } from "lotus-ui-react/theme";
import React from "react";
import { useLocalizationSelector } from "../../provider";

export const AccountSettingsPage: React.FC = () =>
{
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const { languageType, setLanguageType } = useLocalizationSelector();

  const handleColorSchemeChange = (value: TThemeColorMode | undefined) =>
  {
    setColorScheme(value as MantineColorScheme);
  }

  const handleLanguageTypeChange = (value: TLanguageType | undefined) =>
  {
    if (value)
    {
      setLanguageType(value);
    }
  }

  return (
    <Box centerContent='center'>
      <VerticalStack spacing={"md"} p="lg" m="lg" borderRadius w="min(600px, 80vw)" hAlign="stretch">
        <SegmentedField<TThemeColorMode> inlinePlace label={"Тема"} labelProps={{ w: '160px' }} options={ThemeColorModeOptions}
          value={colorScheme as TThemeColorMode}
          onChanged={handleColorSchemeChange}
        />
        <SelectField<TLanguageType> inlinePlace label={"Язык"} labelProps={{ w: '160px' }}
          value={languageType}
          options={LanguageTypeOptions} onChanged={handleLanguageTypeChange} />
      </VerticalStack>
    </Box>
  );
};
