import { type TLanguageType } from 'lotus-core';
import { LocalizationAccount } from './LocalizationAccount';
import { LocalizationAccountDataEn } from './LocalizationAccountDataEn';
import { LocalizationAccountDataRu } from './LocalizationAccountDataRu';

export class LocalizationAccountDispatcher
{
  // #region Static properties
  private static _currentLanguage: TLanguageType | undefined;

  /**
   * Получить текущую язык
   */
  public static get currentLanguage(): TLanguageType
  {
    if (LocalizationAccountDispatcher._currentLanguage) return LocalizationAccountDispatcher._currentLanguage;
    return 'ru-RU';
  }

  /**
   * Установить текущий язык
   */
  public static set currentLanguage(language: TLanguageType)
  {
    LocalizationAccountDispatcher._currentLanguage = language;
    if (language == 'en-US') LocalizationAccount.data = LocalizationAccountDataEn;
    if (language == 'ru-RU') LocalizationAccount.data = LocalizationAccountDataRu;
  }
  // #endregion
};