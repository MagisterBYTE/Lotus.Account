import { Environment } from 'lotus-core/environment';
import { DateTimeFormatter } from 'lotus-core/formatters';
import { FunctionHelper, StringHelper } from 'lotus-core/helpers';
import { LocalizationAccount, LocalizationAccountDispatcher } from '#localization';
import { castToSuccessAuthResponse, type ILoginParameters, type IRegisterParameters, type IUserAuthorizeInfo } from './domain';
import { TokenService } from './domain/TokenService';
import { AuthApiService } from './domain/api';

class AuthServiceClass
{
  // #region Const
  /**
   * Время последнего входя на сайт
   */
  private static readonly LastLoginTime: string = 'lotus-account-last-login-time' as const;
  // #endregion

  // #region Static fields
  private static _authService: AuthServiceClass;

  public static get Instance(): AuthServiceClass
  {
    return this._authService || (this._authService = new this());
  }
  // #endregion

  // #region Fields
  public tokenService: TokenService;
  public authApiService: AuthApiService;
  // #endregion

  // #region Properties
  public get isAuth()
  {
    return this.tokenService.hasValidAccessToken();
  }
  // #endregion

  // #region Constructor
  constructor()
  {
    this.tokenService = new TokenService(window.localStorage);
    this.authApiService = new AuthApiService(this.tokenService);
    FunctionHelper.bindAllMethods(this);
  }
  // #endregion

  // #region Main methods
  /**
   * Вход через пароль и логин
   * @param loginParameters Параметры для входа
   * @returns
   */
  public async loginAsync(loginParameters: ILoginParameters): Promise<IUserAuthorizeInfo>
  {
    const response = await this.authApiService.loginCookieAsync(loginParameters);
    return response;
    // if (response)
    // {
    //   const data = castToSuccessAuthResponse(response);
    //   if (data)
    //   {
    //     this.tokenService.setData(data);

    //     this.saveLastLoginTime();

    //     if (redirectUrl)
    //     {
    //       location.assign(redirectUrl);
    //     }
    //   }
    // }
  }

  /**
   * Вход через пароль и логин
   * @param loginParameters Параметры для входа
   * @returns
   */
  public async loginGoogleAsync(): Promise<IUserAuthorizeInfo>
  {
    const response = await this.authApiService.loginGoogleAsync();
    return response;
    // if (response)
    // {
    //   const data = castToSuccessAuthResponse(response);
    //   if (data)
    //   {
    //     this.tokenService.setData(data);

    //     this.saveLastLoginTime();

    //     if (redirectUrl)
    //     {
    //       location.assign(redirectUrl);
    //     }
    //   }
    // }
  }

  /**
   * Вход через сохраненную куку
   */
  public async rememberMeAsync(redirectUrl?: string)
  {
    const response = await this.authApiService.rememberMeAsync();
    if (response)
    {
      const data = castToSuccessAuthResponse(response);
      if (data)
      {
        this.tokenService.setData(data);

        this.saveLastLoginTime();

        if (redirectUrl)
        {
          location.assign(redirectUrl);
        }
      }
    }
  }

  /**
   * Регистрация нового пользователя
   * @param registerParameters Параметры для регистрации нового пользователя
   * @param redirectUrl URL-адрес перенаправления в случае успешной регистрации
   */
  public async registerAsync(registerParameters: IRegisterParameters, redirectUrl?: string)
  {
    await this.authApiService.registerAsync(registerParameters);
    if (redirectUrl)
    {
      location.assign(redirectUrl);
    }
  }

  /**
   * Выход из сайта
   */
  public async logoutAsync()
  {
    await this.authApiService.logoutCookieAsync();

    // // Очищаем
    // this.tokenService.clearData();

    location.assign('/');
  }
  // #endregion

  // #region Common methods
  public getUserInfoAsync(): Promise<IUserAuthorizeInfo>
  {
    if (Environment.isCookieAuth)
    {
      return this.authApiService.getUserInfoCookieAsync();
    }
    else
    {
      return this.authApiService.getUserInfoTokenAsync();
    }
  }

  /**
   * Проверяет, есть ли у пользователя сохраненная сессия
   * (токены или remember me cookie)
   *
   * @returns true если есть возможность восстановить сессию
   */
  public hasSavedSession(): boolean
  {
    // Проверяем валидный access токен
    if (this.tokenService.hasValidAccessToken())
    {
      return true;
    }

    // Проверяем возможность обновления через refresh токен
    if (this.tokenService.canRefreshToken())
    {
      return true;
    }

    return false;
  }

  /**
   * Возвращает строку с информацией о статусе аутентификации
   * и времени истечения токена в удобном для пользователя формате
   *
   * @returns Строка с информацией об аутентификации
   *
   * @example
   * ```typescript
   * console.log(AuthService.getAuthInfo());
   * // "Аутентифицирован. Токен истекает: 15.12.2024 14:30 (через 2 часа 15 минут)"
   * // или
   * // "Не аутентифицирован. Последний вход: 10.12.2024 09:15"
   * // или
   * // "Сессия истекла. Требуется повторный вход"
   * ```
   */
  public getAuthInfo(): string
  {
    if (!this.tokenService.hasValidAccessToken())
    {
      return this.getUnauthenticatedInfo();
    }

    return this.getTokenExpiryInfo();
  }

  /**
   * Получает информацию для неаутентифицированного пользователя
   */
  private getUnauthenticatedInfo(): string
  {
    // Проверяем, был ли ранее вход
    const lastLogin = this.getLastLoginTime();

    if (lastLogin)
    {
      const formattedDate = DateTimeFormatter.dateTime(lastLogin);
      const timeAgo = DateTimeFormatter.formatRelativeOfDate(lastLogin);

      return StringHelper.stringFormat(LocalizationAccount.data.auth.infoLastLogin, formattedDate, timeAgo);
    }

    // Проверяем, есть ли сохраненная сессия
    if (this.hasSavedSession())
    {
      return LocalizationAccount.data.auth.infoSavedSession;
    }

    return LocalizationAccount.data.auth.infoNotAuth;
  }

  /**
   * Формирует информацию о времени истечения токена
   */
  private getTokenExpiryInfo(): string
  {
    const expiryDetails = this.tokenService.getTokenExpiryDetails();

    if (expiryDetails.isExpired)
    {
      return 'Сессия истекла. Требуется повторный вход';
    }

    // const userInfo = this.getUserInfo();
    const username = this.tokenService.getUserName() ?? 'Пользователь';

    const remainingTime = expiryDetails.remainingTime;
    const lang = LocalizationAccountDispatcher.currentLanguage;
    const formattedDate = DateTimeFormatter.dateTime(expiryDetails.expiryDate!, lang);

    let status = 'Аутентифицирован';
    if (this.tokenService.isTokenExpiringSoon(300))
    {
      // 5 минут
      status = '⚠️ Аутентифицирован (токен скоро истекает)';
    }
    else if (this.tokenService.isTokenExpiringSoon(60))
    {
      // 1 минута
      status = '🔴 Аутентифицирован (токен почти истек)';
    }

    return `${status} как ${username}. Токен истекает: ${formattedDate} (${remainingTime})`;
  }

  /**
   * Получает время последнего входа
   */
  private getLastLoginTime(): Date | undefined
  {
    try
    {
      const stored = localStorage.getItem(AuthServiceClass.LastLoginTime);
      if (stored)
      {
        return new Date(parseInt(stored, 10));
      }
    }
    catch
    {
      // ignore
    }

    return undefined;
  }

  /**
   * Сохраняет время последнего входа
   */
  private saveLastLoginTime(): void
  {
    try
    {
      localStorage.setItem(AuthServiceClass.LastLoginTime, Date.now().toString());
    }
    catch
    {
      // ignore
    }
  }
  // #endregion
}

/**
 * Глобальный доступ к сервису по авторизации и регистрации пользователя
 */
export const AuthService = AuthServiceClass.Instance;
