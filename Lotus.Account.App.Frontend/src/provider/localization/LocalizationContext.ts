import { createContext } from 'react';
import { type TLanguageType } from 'lotus-core/localization';

export interface ILocalizationContextType
{
  languageType:TLanguageType,
  setLanguageType: (languageType: TLanguageType) => void;
}

export const LocalizationContext = createContext<ILocalizationContextType | undefined>(undefined);