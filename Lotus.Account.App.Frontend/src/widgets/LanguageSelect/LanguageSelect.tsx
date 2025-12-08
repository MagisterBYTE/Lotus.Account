import { Combobox, Input, InputBase, TextInput, useCombobox } from '@mantine/core';
import { useState } from 'react';
import type { IOption } from 'lotus-core/modules/option';
import type { TLanguageType } from 'lotus-core/localization';

export interface ILanguageSelectProps
{

}

export function LanguageSelect(props: ILanguageSelectProps) 
{
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(null);

  const options:IOption<TLanguageType>[] = [
  {
    value: 'ru-RU',
    label: 'Русский',
  },
  {
    value: 'en-US',
    label: 'English',
  },
  ]

  const comboboxOptions = options.map((item) => (
    <Combobox.Option value={item.value} key={item.value}>
      {item.label}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        setValue(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
      <TextInput
          required
          error='error'
          value={value!}
          onChange={(event) => {
            setValue(event.currentTarget.value);
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown()}
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{comboboxOptions}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};