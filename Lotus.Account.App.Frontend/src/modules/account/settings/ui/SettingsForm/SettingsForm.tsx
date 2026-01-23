import { useMantineColorScheme, type MantineColorScheme } from '@mantine/core';
import { TLanguageTypes, type TLanguageType } from 'lotus-core/localization';
import type { IOption } from 'lotus-core/modules/option';
import { SegmentedField, SelectField } from 'lotus-ui-react/components/Controls';
import { ColorSchemeOptions, type TColorScheme } from 'lotus-ui-react/designSystem/types';
import { useDesignSystemContext, useLocalizationContext } from 'lotus-ui-react/provider';
import { ContainerForm } from '#components';
import { LocalizationAccount } from '#localization';

export function SettingsForm() 
{
  type TOptionColorScheme = IOption<TColorScheme>;
  type TOptionLanguageType = IOption<TLanguageType>;
  
  const { colorScheme, setColorScheme: setColorSchemeMantine } = useMantineColorScheme();
  const { setColorScheme: setColorSchemeDesign } = useDesignSystemContext();
  const { languageType, setLanguageType } = useLocalizationContext();

  const labelWidth = '140px';

  const selectColorScheme:TOptionColorScheme = { label: colorScheme, value: colorScheme as TColorScheme };
  const selectLanguageType:TOptionLanguageType = { label: languageType, value: languageType };

  // #region  Handlers
  const handleColorSchemeChange = (option: TOptionColorScheme | undefined) =>
  {
    if (!option) return;
    setColorSchemeMantine(option.value as MantineColorScheme);
    setColorSchemeDesign(option.value);
  };
  
  const handleLanguageTypeChange = (option: TOptionLanguageType | undefined) =>
  {
    if (!option) return;
    setLanguageType(option.value);
  };
  // #endregion

  return (
    <ContainerForm hasDivider header={LocalizationAccount.data.account.settings} spacing={'lg'}>
      <SegmentedField<TOptionColorScheme> inlinePlace items={ColorSchemeOptions} label={LocalizationAccount.data.account.settingsTheme}
        labelProps={{ w: labelWidth }}
        selectedItem={selectColorScheme}
        onChangedItem={handleColorSchemeChange}
      />
      <SelectField<TOptionLanguageType> inlinePlace items={TLanguageTypes.getOptions()} label={LocalizationAccount.data.account.settingsLang}
        labelProps={{ w: labelWidth }}
        selectedItem={selectLanguageType} onChangedItem={handleLanguageTypeChange} />
    </ContainerForm>
  );
}
