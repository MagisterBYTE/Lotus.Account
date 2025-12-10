import { type ILocalizationDispatcher, type TLanguageType } from 'lotus-core/localization';
import { FunctionHelper } from 'lotus-core/helpers';
import { LocalizationAccount } from './LocalizationAccount';
import { LocalizationAccountDataEn } from './LocalizationAccountDataEn';
import { LocalizationAccountDataRu } from './LocalizationAccountDataRu';

export class LocalizationAccountDispatcherClass implements ILocalizationDispatcher
{
  // #region Static fields
  private static _localizationAccount: LocalizationAccountDispatcherClass;

  public static get Instance(): LocalizationAccountDispatcherClass
  {
    return this._localizationAccount || (this._localizationAccount = new this());
  }
  // #endregion

  private _currentLanguage: TLanguageType | undefined;

  // #region Properties
  /**
   * Получить текущую язык
   */
  public get currentLanguage(): TLanguageType
  {
    if (this._currentLanguage) return this._currentLanguage;
    return 'ru-RU';
  }

  /**
   * Установить текущий язык
   */
  public set currentLanguage(language: TLanguageType)
  {
    this._currentLanguage = language;
    if (language == 'en-US') LocalizationAccount.data = LocalizationAccountDataEn;
    if (language == 'ru-RU') LocalizationAccount.data = LocalizationAccountDataRu;
  }
  // #endregion

  // #region Constructor
  constructor()
  {
    FunctionHelper.bindAllMethods(this);
  }
  // #endregion

  // #region Main methods
  /**
   * Установить текущий язык
   * @param language Язык
   */
  public setLanguage(language: TLanguageType | undefined)
  {
    if (language)
    {
      this._currentLanguage = language;
      if (language == 'en-US') LocalizationAccount.data = LocalizationAccountDataEn;
      if (language == 'ru-RU') LocalizationAccount.data = LocalizationAccountDataRu;
    }
  }
  // #endregion
};

/**
 * Глобальный доступ к диспетчеру локализации модуля Account
 */
export const LocalizationAccountDispatcher = LocalizationAccountDispatcherClass.Instance;