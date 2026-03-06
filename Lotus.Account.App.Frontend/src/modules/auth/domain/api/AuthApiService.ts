import { Environment } from 'lotus-core/environment';
import { ApiRequestConfig, ContentTypeConstants, HeaderNamesConstants } from 'lotus-core/modules/api';
import { AppApiService } from '#app';
import type { TokenService } from '../TokenService';
import { castToSuccessAuthResponse, type ILoginParameters, type IRegisterParameters, type ISuccessAuthResponse, type IUserAuthorizeInfo } from '../type';

/**
 * Класс для сервисов Api с поддержкой авторизации
 */
export class AuthApiService extends AppApiService 
{
  // #region Const
  /**
   * Дельта времени истечения срока действия токена, в секундах
   */
  private static readonly RefreshTokenDelta: number = 300 as const; // 5 минут в секундах

  private static readonly PathLoginToken = 'connect/token' as const;
  private static readonly PathRememberMe = 'api/Authorize/RememberMe' as const;
  private static readonly PathLogoutToken = 'connect/logout' as const;
  private static readonly PathUserInfoToken = '/connect/userinfo' as const;
  private static readonly PathLoginCookie = 'api/Authorize/LoginCookie' as const;
  private static readonly PathLogoutCookie = 'api/Authorize/LogoutCookie' as const;
  private static readonly PathUserInfoCookie = 'api/Authorize/GetUserInfoCookie' as const;
  private static readonly PathLoginGoogle = 'api/Authorize/LoginGoogle' as const;
  private static readonly PathUserInfoGoogle = 'api/Authorize/GetUserInfoGoogle' as const;
  private static readonly PathRegister = 'api/Authorize/Register' as const;

  /**
   * Маршруты для которых не требуется авторизации
   */
  private static readonly RouteNotAuth: ReadonlyArray<string> = [
    AuthApiService.PathLoginToken,
    AuthApiService.PathRememberMe,
    AuthApiService.PathLoginCookie,
    AuthApiService.PathLoginGoogle,
    AuthApiService.PathRegister
  ] as const;

  private static isRefreshing = false;
  // #endregion

  // #region Fields
  private readonly isAuthCookie: boolean;
  private readonly tokenService: TokenService;
  private readonly pendingRequests: Array<{
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
  }> = [];
  // #endregion

  constructor(tokenService: TokenService) 
  {
    super();
    this.tokenService = tokenService;
    this.isAuthCookie = Environment.isCookieAuth;
  }

  // #region Private methods
  protected override async handleRequest(fullUri: string, config: ApiRequestConfig): Promise<ApiRequestConfig>
  {
    // Если это авторизация через куки то не добавляем токен доступа
    if (this.isAuthCookie) 
    {
      return this.setRequestConfig(config, false);
    }

    // Проверяем, требуется ли авторизация для этого маршрута
    const requiresAuth = !this.isRouteExcluded(fullUri);

    if (!requiresAuth) 
    {
      return this.setRequestConfig(config, false);
    }

    // Проверяем срок действия токена
    const isTokenValid = await this.checkAndRefreshToken();

    if (!isTokenValid) 
    {
      throw new Error('Authentication required');
    }

    // Добавляем токен в заголовок
    const accessToken = this.tokenService.getAccessToken();
    if (accessToken) 
    {
      return this.setRequestConfig(config, true, accessToken);
    }

    return this.setRequestConfig(config, false);
  }

  /**
   * Настройка конфигурации запроса
   */
  private setRequestConfig(config: ApiRequestConfig, includeAuth: boolean, accessToken?: string): ApiRequestConfig 
  {
    const newConfig: ApiRequestConfig = new ApiRequestConfig(config);

    if (includeAuth && accessToken) 
    {
      newConfig.setAuthorization(accessToken);
    }

    // Настраиваем таймаут и другие параметры
    newConfig.timeout = 10 * 60 * 1000; // 10 минут

    // Для того чтобы передавать защищенные куки
    newConfig.setCredentials('include');

    return newConfig;
  }

  /**
   * Проверяет, исключен ли маршрут из авторизации
   */
  private isRouteExcluded(url?: string): boolean 
  {
    if (!url) return false;
    return AuthApiService.RouteNotAuth.some((route) => url.includes(route) || url.endsWith(route));
  }
  // #endregion

  // #region Auth cookie
  /**
   * Вход через пароль и логин с использованием куки
   * @param loginParameters Параметры для входа
   */
  public async loginCookieAsync(loginParameters: ILoginParameters): Promise<IUserAuthorizeInfo> 
  {
    const url = AuthApiService.PathLoginCookie;

    const response = await this.post<IUserAuthorizeInfo>(url, loginParameters);
    return response;
  }

  public async getUserInfoCookieAsync(): Promise<IUserAuthorizeInfo> 
  {
    const url = AuthApiService.PathUserInfoCookie;
    const response = await this.get<IUserAuthorizeInfo>(url);
    return response;
  }

  /**
   * Выход из сайта с использованием куки
   */
  public async logoutCookieAsync() 
  {
    const url = AuthApiService.PathLogoutCookie;
    await this.post(url, null);
  }
  // #endregion

  // #region Auth token
  /**
   * Вход через пароль и логин с использованием токена
   * @param loginParameters Параметры для входа
   */
  public async loginTokenAsync(loginParameters: ILoginParameters): Promise<ISuccessAuthResponse> 
  {
    const url = AuthApiService.PathLoginToken;

    const data = new URLSearchParams({
      username: loginParameters.login,
      password: loginParameters.password,
      grant_type: 'password',
      scope: 'offline_access'
    });

    const config = new ApiRequestConfig();

    if (loginParameters.rememberMe) 
    {
      config.addHeader('X-RememberMe', 'true');
    }

    const response = await this.post<ISuccessAuthResponse>(url, data, config);
    return response;
  }

  /**
   * Вход через сохраненную куку
   */
  public async rememberMeAsync(): Promise<ISuccessAuthResponse> 
  {
    const url = AuthApiService.PathRememberMe;

    // Так как мы используем OpenIddict то он ожидает application/x-www-form-urlencoded для OAuth эндпоинтов
    const data = new URLSearchParams({
      username: 'fake',
      password: 'fake',
      grant_type: 'password',
      scope: 'offline_access'
    });

    const config = new ApiRequestConfig();
    config.setCredentials();
    config.addHeader(HeaderNamesConstants.ContentType, ContentTypeConstants.ApplicationXWwwFormUrlencoded);

    const response = await this.post<ISuccessAuthResponse>(url, data, config);
    return response;
  }

  public async getUserInfoTokenAsync(): Promise<IUserAuthorizeInfo> 
  {
    const url = AuthApiService.PathUserInfoToken;

    const config = new ApiRequestConfig();
    config.setCredentials();

    const response = await this.get<IUserAuthorizeInfo>(url, undefined, config);
    return response;
  }

  /**
   * Выход из сайта с использованием токена
   */
  public async logoutTokenAsync() 
  {
    const url = AuthApiService.PathLogoutToken;
    await this.post(url, undefined);
  }
  // #endregion

  // #region Auth google
  // eslint-disable-next-line require-await
  public async loginGoogleAsync(): Promise<IUserAuthorizeInfo> 
  {
    const backendApi = Environment.backendApi;
    const frontApi = Environment.frontApi;
    location.assign(`${backendApi}/${AuthApiService.PathLoginGoogle}?returnUrl=${frontApi}/`);
    return this.getUserInfoGoogleAsync();
  }

  public async getUserInfoGoogleAsync(): Promise<IUserAuthorizeInfo> 
  {
    const url = AuthApiService.PathUserInfoGoogle;

    const config = new ApiRequestConfig();
    config.setCredentials();

    const response = await this.get<IUserAuthorizeInfo>(url, undefined, config);
    return response;
  }
  // #endregion

  // #region Main methods
  /**
   * Регистрация нового пользователя
   * @param registerParameters Параметры для регистрации нового пользователя
   */
  public async registerAsync(registerParameters: IRegisterParameters) 
  {
    const url = AuthApiService.PathRegister;
    await this.post(url, registerParameters);
  }
  // #endregion

  // #region RefreshToken methods
  /**
   * Обновление токена
   */
  // eslint-disable-next-line require-await
  public async refreshTokenAsync(): Promise<ISuccessAuthResponse> 
  {
    const refreshToken = this.tokenService.getRefreshToken();
    if (!refreshToken) 
    {
      throw new Error('No refresh token available');
    }

    const url = 'connect/token';
    const data = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      scope: 'offline_access'
    });

    return this.post<ISuccessAuthResponse>(url, data);
  }

  /**
   * Проверяет и обновляет токен при необходимости
   */
  private async checkAndRefreshToken(): Promise<boolean> 
  {
    const accessToken = this.tokenService.getAccessToken();
    const refreshToken = this.tokenService.getRefreshToken();

    if (!accessToken || !refreshToken) 
    {
      return false;
    }

    // Проверяем срок действия access token
    const expiresIn = this.tokenService.getExpiresIn();
    const currentTime = Math.floor(Date.now() / 1000);
    const timeUntilExpiry = expiresIn - currentTime;

    // Если токен истекает через менее 5 минут, обновляем
    if (timeUntilExpiry < AuthApiService.RefreshTokenDelta) 
    {
      try 
      {
        const newTokens = await this.refreshTokenSafely();
        return !!newTokens;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      catch (error) 
      {
        return false;
      }
    }

    return true;
  }

  /**
   * Безопасное обновление токена с защитой от конкурентных запросов
   */
  private async refreshTokenSafely(): Promise<ISuccessAuthResponse | null> 
  {
    // Если уже идет обновление, ждем его завершения
    if (AuthApiService.isRefreshing) 
    {
      return new Promise((resolve, reject) => 
      {
        this.pendingRequests.push({ resolve, reject });
      }).then(() => 
      {
        const token = this.tokenService.getAccessToken();
        return token ? ({ access_token: token } as ISuccessAuthResponse) : null;
      });
    }

    AuthApiService.isRefreshing = true;

    try 
    {
      const response = await this.refreshTokenAsync();
      const data = castToSuccessAuthResponse(response);

      if (data) 
      {
        this.tokenService.setData(data);

        // Разрешаем все ожидающие запросы
        this.pendingRequests.forEach((request) => request.resolve(data.access_token));
        this.pendingRequests.length = 0;

        return data;
      }
      return null;
    }
    catch (error) 
    {
      // Отклоняем все ожидающие запросы
      this.pendingRequests.forEach((request) => request.reject(error));
      this.pendingRequests.length = 0;

      throw error;
    }
    finally 
    {
      AuthApiService.isRefreshing = false;
    }
  }
  // #endregion
}
