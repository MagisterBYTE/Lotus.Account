import { useMantineColorScheme, type MantineColorScheme } from '@mantine/core';
import { LanguageTypeOptions, type TLanguageType } from 'lotus-core/localization';
import { SegmentedField, SelectField } from 'lotus-ui-react/components/Controls';
import { Box, VerticalStack } from 'lotus-ui-react/components/Layout';
import { ColorSchemeOptions, type TColorScheme } from 'lotus-ui-react/designSystem/types';
import React from 'react';
import { useLocalizationContext } from '../../provider';

export const AccountSettingsPage: React.FC = () =>
{
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const { languageType, setLanguageType } = useLocalizationContext();

  const handleColorSchemeChange = (value: TColorScheme | undefined) =>
  {
    setColorScheme(value as MantineColorScheme);
  };

  const handleLanguageTypeChange = (value: TLanguageType | undefined) =>
  {
    if (value)
    {
      setLanguageType(value);
    }
  };

  return (
    <Box centerContent='center'>
      <VerticalStack bdRadius hAlign="stretch" m="lg" p="lg" spacing={'md'} w="min(600px, 80vw)">
        <SegmentedField<TColorScheme> inlinePlace label={'Тема'} labelProps={{ w: '160px' }}
          options={ColorSchemeOptions}
          value={colorScheme as TColorScheme}
          onChanged={handleColorSchemeChange}
        />
        <SelectField<TLanguageType> inlinePlace label={'Язык'} labelProps={{ w: '160px' }}
          options={LanguageTypeOptions}
          value={languageType} onChanged={handleLanguageTypeChange} />
      </VerticalStack>
    </Box>
  );
};
