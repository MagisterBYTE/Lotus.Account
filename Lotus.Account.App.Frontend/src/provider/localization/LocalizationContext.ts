import { type TLanguageType } from 'lotus-core/localization';
import { createContext } from 'react';

export interface ILocalizationContextType
{
  languageType:TLanguageType,
  setLanguageType: (languageType: TLanguageType) => void;
}

export const LocalizationContext = createContext<ILocalizationContextType | undefined>(undefined);