import { useEffect, useState } from 'react';
import { createLanguageChangeEvent, LocalizationCoreDispatcher, type TLanguageType } from 'lotus-core/localization';
import { LocalizationAccountDispatcher } from '#localization';
import { LocalizationContext } from './LocalizationContext';

export const LocalizationProvider = (props: { children: React.ReactNode }) => 
{
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
    window.dispatchEvent(eventData)

  }, [languageType]);

  return (
    <LocalizationContext.Provider
      key={providerKey} 
      value={{
        languageType: languageType,
        setLanguageType: setLanguageType
      }}
    >
      {props.children}
    </LocalizationContext.Provider>
  );
};
