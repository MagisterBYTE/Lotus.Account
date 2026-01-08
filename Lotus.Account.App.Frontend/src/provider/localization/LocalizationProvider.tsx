import { createLanguageChangeEvent, LocalizationCoreDispatcher, type TLanguageType } from 'lotus-core/localization';
import { useEffect, useState } from 'react';
import { LocalizationAccountDispatcher } from '#localization';
import { LocalizationContext } from './LocalizationContext';

export interface ILocalizationProviderProps
{
  children: React.ReactNode;
}

export const LocalizationProvider = (props: ILocalizationProviderProps) => 
{
  const { children } = props;
  const [languageType, setLanguageType] = useState<TLanguageType>('ru-RU');
  const [providerKey, setProviderKey] = useState(0); // Ключ для принудительного обновления

  useEffect(() => 
  {
    // В память
    LocalizationCoreDispatcher.setLanguage(languageType);
    LocalizationAccountDispatcher.setLanguage(languageType);

    // Увеличиваем ключ для принудительного ререндера всех детей
    setProviderKey(prev => prev + 1);

    const eventData = createLanguageChangeEvent(languageType);
    window.dispatchEvent(eventData);
  }, [languageType]);

  return (
    <LocalizationContext.Provider
      key={providerKey} 
      value={{
        languageType: languageType,
        setLanguageType: setLanguageType
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};
